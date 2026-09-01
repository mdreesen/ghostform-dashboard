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
      let final = ''
      let partial = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i]
        if (r.isFinal) final += r[0].transcript
        else partial += r[0].transcript
      }
      if (final) transcript.value = (transcript.value + ' ' + final).trim()
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
    [transcript.value, interim.value].filter(Boolean).join(' ')
  )

  return { supported, listening, transcript, interim, displayText, error, start, stop, toggle, reset }
}
