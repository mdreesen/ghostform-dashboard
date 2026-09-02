/**
 * ============================================================================
 * VOICE INPUT
 * ============================================================================
 * Uses the browser's built-in SpeechRecognition rather than recording audio and
 * sending it to a transcription API.
 *
 * WHY:
 *   - $0. Whisper is ~$0.006/min, which is nothing per note but is a per-use
 *     cost on a feature people will use constantly.
 *   - Instant. Text appears as you speak instead of after an upload round trip.
 *   - No audio ever leaves as a file we're responsible for storing — and these
 *     notes are about clients, so not holding the recording is a feature.
 *
 * THE TRADE: Firefox doesn't support it, and accuracy on proper nouns (street
 * names, client surnames) is worse than Whisper. Both are handled — the button
 * only appears where it works, and the transcript is always editable text
 * before anything is saved, never sent straight to an AI.
 * ============================================================================
 */

export interface VoiceState {
  supported: boolean
  listening: boolean
  transcript: string
  error: string
}

/**
 * Last-resort guard.
 *
 * Speech APIs vary more than the spec implies, and I've now been wrong twice
 * about which shape they emit. If some browser still slips a repeated run
 * through, collapse it here rather than putting it in front of a realtor.
 *
 * Only collapses runs of 3+ words repeated back to back — short natural
 * repetition ("no no, the other one") is left alone.
 */
export function dedupeRuns(text: string): string {
  const words = text.split(/\s+/).filter(Boolean)
  const out: string[] = []
  for (const w of words) {
    out.push(w)
    // Look for the tail repeating the run before it
    for (let n = 6; n >= 3; n--) {
      if (out.length < n * 2) continue
      const a = out.slice(-n).join(' ').toLowerCase()
      const b = out.slice(-n * 2, -n).join(' ').toLowerCase()
      if (a === b) { out.splice(-n); break }
    }
  }
  return out.join(' ')
}

export function useVoiceInput() {
  const listening = ref(false)
  const transcript = ref('')
  const interim = ref('')
  const error = ref('')
  const supported = ref(false)

  let recognition: any = null

  onMounted(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    supported.value = Boolean(SR)
  })

  function start() {
    error.value = ''

    // Tear down any previous instance. Calling start() twice without this
    // leaves two recognisers running, and both write to the same transcript —
    // a second route to duplicated text.
    try { recognition?.abort() } catch { /* nothing running */ }
    recognition = null
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) {
      error.value = 'This browser can\'t do voice. Chrome, Edge or Safari will work.'
      return
    }

    recognition = new SR()
    recognition.continuous = true          // don't stop at the first pause
    recognition.interimResults = true      // show words as they're spoken
    recognition.lang = navigator.language || 'en-US'

    recognition.onresult = (event: any) => {
      /**
       * ANDROID CHROME EMITS EACH REVISION AS A NEW FINAL RESULT.
       *
       * Saying "testing this voice reminder" produces results like:
       *
       *   [0] "testing"                     isFinal
       *   [1] "testing"                     isFinal
       *   [2] "testing this"                isFinal
       *   [3] "testing this voice"          isFinal
       *   [4] "testing this voice reminder" isFinal
       *
       * Each entry RESTATES the previous one plus a word. Concatenating them —
       * which is what a straight rebuild does — gives:
       *
       *   "testing testing testing this testing this voice testing this voice reminder"
       *
       * My previous fix rebuilt instead of appending, which solved the
       * resultIndex problem but not this one, because the duplication is in
       * the results array itself.
       *
       * So: when a segment extends the previous one, REPLACE it rather than
       * appending. Genuinely separate phrases (desktop Chrome sends those with
       * no overlap) still concatenate normally, and repeated words inside a
       * single segment are left alone.
       */
      const parts: string[] = []
      let partial = ''

      for (let i = 0; i < event.results.length; i++) {
        const r = event.results[i]
        if (!r?.[0]) continue
        const seg = String(r[0].transcript || '').trim()
        if (!seg) continue

        if (!r.isFinal) { partial = seg; continue }

        // Already covered by what we have
        const joined = parts.join(' ')
        if (joined === seg || joined.endsWith(seg)) continue

        // A revision of the previous segment — replace it
        const prev = parts[parts.length - 1]
        if (prev && seg.startsWith(prev)) { parts[parts.length - 1] = seg; continue }

        parts.push(seg)
      }

      transcript.value = parts.join(' ')
      interim.value = partial
    }

    recognition.onerror = (e: any) => {
      // Distinct causes need distinct messages — "not-allowed" is a permission
      // problem the user can fix, "no-speech" is not an error at all.
      const map: Record<string, string> = {
        'not-allowed': 'Microphone access was blocked. Allow it in your browser settings.',
        'service-not-allowed': 'Microphone access was blocked.',
        'no-speech': '',
        'audio-capture': 'No microphone found.',
        'network': 'Voice needs a connection. Type it instead for now.'
      }
      const msg = map[e.error]
      if (msg !== '') error.value = msg ?? 'Voice stopped unexpectedly.'
      listening.value = false
    }

    recognition.onend = () => {
      listening.value = false
      interim.value = ''
    }

    try {
      recognition.start()
      listening.value = true
    } catch {
      // start() throws if already running — harmless.
      listening.value = true
    }
  }

  function stop() {
    try { recognition?.stop() } catch { /* already stopped */ }
    listening.value = false
    interim.value = ''
  }

  function toggle() { listening.value ? stop() : start() }

  function reset() {
    transcript.value = ''
    interim.value = ''
    error.value = ''
  }

  onBeforeUnmount(() => { try { recognition?.abort() } catch { /* noop */ } })


  /** What to show in the field: confirmed text plus whatever is mid-sentence. */
  const displayText = computed(() =>
    dedupeRuns([transcript.value, interim.value].filter(Boolean).join(' '))
  )

  return { supported, listening, transcript, interim, displayText, error, start, stop, toggle, reset }
}
