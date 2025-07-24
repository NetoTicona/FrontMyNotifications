import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly VIDEOS_KEY = 'videos';
  public videos: string[] = [];

  constructor() {}

  /**
   * Load video file names from Preferences storage.
   */
  async loadVideos(): Promise<string[]> {
    const { value } = await Preferences.get({ key: this.VIDEOS_KEY });
    this.videos = value ? JSON.parse(value) : [];
    return this.videos;
  }

  /**
   * Save a recorded video blob to file and store its name in Preferences.
   */
  async storeVideo(blob: Blob): Promise<void> {
    const fileName = this.generateFileName();
    console.log('[VideoService] Saving video as:', fileName);

    const base64 = await this.convertBlobToBase64(blob);

    // Check if running on desktop
    if (Capacitor.getPlatform() === 'web') {
      // Desktop-specific handling
      await this.saveToDesktop(fileName, base64);
    } else {
      // Mobile handling (original behavior)
      await Filesystem.writeFile({
        path: fileName,
        data: base64,
        directory: Directory.Documents,
      });
    }

    // Add new video to the beginning of the list
    this.videos.unshift(fileName);

    await Preferences.set({
      key: this.VIDEOS_KEY,
      value: JSON.stringify(this.videos),
    });

    console.log('[VideoService] Video saved and listed.');
  }

  private async saveToDesktop(fileName: string, base64Data: string): Promise<void> {
    try {
      // For desktop, we'll use the Downloads directory
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.External,
      });
    } catch (error) {
      console.error('Error saving to desktop:', error);
      // Fallback to Documents if Downloads fails
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Documents,
      });
    }
  }


  /**
   * Get the full base64 video data for display or playback.
   */
  async getVideoUrl(fileName: string): Promise<string> {
    const file = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Documents,
    });

    return `data:video/webm;base64,${file.data}`;
  }

  /**
   * Helper to convert a Blob to base64 string.
   */
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Blob to Base64 failed'));
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Generate a unique filename based on timestamp.
   * Format: dd-MM-yyyy_HH-mm-ss-SSS.webm
   */
  private generateFileName(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.webm`;
  }
}
