import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

export enum ExternalScript {
    GOOGLE_MAPS = 'googleMaps'
}

const EXTERNAL_SCRIPTS: Record<ExternalScript, string> = {
    [ExternalScript.GOOGLE_MAPS]: `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`
};

@Injectable({
    providedIn: 'root'
})
export class ScriptLoader {

    private readonly loadedScripts = new Set<ExternalScript>();

    loadAll(...scriptNames: ExternalScript[]): Promise<void> {
        return Promise.all(scriptNames.map((scriptName) => this.load(scriptName))).then(() => void 0);
    }

    load(scriptName: ExternalScript): Promise<void> {
        if (this.loadedScripts.has(scriptName)) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script: HTMLScriptElement | any = document.createElement('script');
            script.type = 'text/javascript';
            script.src = EXTERNAL_SCRIPTS[scriptName];

            if (script.readyState) {  // IE
                script.onreadystatechange = () => {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        this.loadedScripts.add(scriptName);
                        resolve();
                    }
                };
            } else {
                script.onload = () => {
                    this.loadedScripts.add(scriptName);
                    resolve();
                };
            }
            script.onerror = (error: any) => reject(error);
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    }

}
