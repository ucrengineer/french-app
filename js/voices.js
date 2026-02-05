window.getVoicesJson = async (lang = 'fr-FR') => {

    if (!('speechSynthesis' in window)) {
        return JSON.stringify({ error: 'Speech synthesis not supported' });
    }

    const synth = window.speechSynthesis;

    const getVoicesAsync = () => new Promise(resolve => {
        let voices = synth.getVoices();
        if (voices.length) {
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

    const filtered = !lang
        ? voices
        : voices.filter(v =>
            (v.lang || '').toLowerCase() === lang.toLowerCase());

    const serialized = filtered.map(v => ({
        voiceURI: v.voiceURI,
        name: v.name,
        lang: v.lang,
        localService: v.localService,
        default: v.default
    }));

    return JSON.stringify(serialized);
};

window.setVoice = (voiceUri) =>
{
    window.selectedVoice = voiceUri;
}
window.speakText = function (text, lang) {
    if (!text) return;

    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
        console.warn('Speech synthesis is not supported in this browser.');
        return;
    }

    const synth = window.speechSynthesis;
    const targetLang = lang || 'fr-FR';

    function speakNow() {
        // Cancel any in-progress speech so repeated clicks behave predictably
        synth.cancel();

        const voices = synth.getVoices();

        const preferredVoiceUri = window.selectedVoice ?? "com.apple.voice.compact.fr-FR.Thomas";

        // Try exact match first, then language prefix (fr vs fr-FR)
        let voice = voices.find(v => v.voiceURI === preferredVoiceUri);


        const utterance = new SpeechSynthesisUtterance(text);

        if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang;
        } else {
            // fallback
            utterance.lang = targetLang;
            console.warn("No matching voice found for", targetLang);
        }

        synth.speak(utterance);
    }

    // Mobile browsers load voices asynchronously
    if (synth.getVoices().length === 0) {
        const handler = function () {
            synth.removeEventListener('voiceschanged', handler);
            speakNow();
        };
        synth.addEventListener('voiceschanged', handler);
    } else {
        speakNow();
    }
};