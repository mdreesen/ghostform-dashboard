// composables/useLocalDB.ts
import Dexie, { type Table } from 'dexie';

interface LocalLead {
  id?: string;
  name: string;
  email: string;
  synced: number; // 0 = False, 1 = True
}

class GhostFormOfflineDB extends Dexie {
  leads!: Table<LocalLead>;

  constructor() {
    super('GhostFormOfflineDB');
    this.version(1).stores({
      leads: 'id, name, email, synced' // Indexed properties
    });
  }
}

const db = new GhostFormOfflineDB();

export const useLocalDB = () => {
  const isOnline = useOnline(); // Reactive online check

  const saveLead = async (lead: Omit<LocalLead, 'synced'>) => {
    const record = {
      ...lead,
      id: lead.id || crypto.randomUUID(),
      synced: isOnline.value ? 1 : 0
    };

    // 1. Write straight to browser IndexedDB instantly
    await db.leads.put(record);

    // 2. If online, fire background sync to MongoDB. If offline, pass gracefully.
    if (isOnline.value) {
      try {
        await $fetch('/api/leads/sync', { method: 'POST', body: record });
      } catch (e) {
        // Network drop caught mid-transit. Switch state to outbox queue.
        await db.leads.update(record.id, { synced: 0 });
      }
    }
  };

  return {
    db,
    saveLead,
    allLeads: () => db.leads.toArray()
  };
};