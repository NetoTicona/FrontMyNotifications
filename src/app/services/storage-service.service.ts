import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  private readonly CONFIG_KEY = 'app_config';
  private readonly SEQUENCES_KEY = 'user_sequences';


  constructor() { }

  saveConfig(config: any): void {
    localStorage.setItem(this.CONFIG_KEY, JSON.stringify(config));
  }

  getConfig(): any {
    const config = localStorage.getItem(this.CONFIG_KEY);
    return config ? JSON.parse(config) : null;
  }

  saveSequence(sequence: any): void {
    const sequences = this.getSequences();
    sequences.push(sequence);
    localStorage.setItem(this.SEQUENCES_KEY, JSON.stringify(sequences));
  }

  getSequences(): any[] {
    const sequences = localStorage.getItem(this.SEQUENCES_KEY);
    return sequences ? JSON.parse(sequences) : [];
  }

  clearData(): void {
    localStorage.removeItem(this.CONFIG_KEY);
    localStorage.removeItem(this.SEQUENCES_KEY);
  }
}
