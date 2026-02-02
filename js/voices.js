export async function getVoicesJson() {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
        return JSON.stringify({ error: 'Speech synthesis is not supported in this browser.' }, null, 2);
    }

    const synth = window.speechSynthesis;

    const getVoicesAsync = () => new Promise((resolve) => {
        const voices = synth.getVoices();
        if (voices && voices.length > 0) {
            resolve(voices);
            return;
        }

        const handler = () => {
            synth.removeEventListener('voiceschanged', handler);
            resolve(synth.getVoices());
        };

        synth.addEventListener('voiceschanged', handler);

        setTimeout(() => {
            synth.removeEventListener('voiceschanged', handler);
            resolve(synth.getVoices());
        }, 2000);
    });

    const voices = await getVoicesAsync();

    const serialized = (voices || []).map((v) => {
        const obj = {};
        for (const k in v) {
            try {
                obj[k] = v[k];
            } catch {
                // ignore
            }
        }

        // Common properties (ensure they show even if non-enumerable)
        obj.voiceURI = v.voiceURI;
        obj.name = v.name;
        obj.lang = v.lang;
        obj.localService = v.localService;
        obj.default = v.default;

        return obj;
    });

    return JSON.stringify(serialized, null, 2);
}
