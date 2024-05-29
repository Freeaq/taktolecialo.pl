document.getElementById('tuningForm').addEventListener('submit', function(event) {
    event.preventDefault();
    

    const baseFreq = parseFloat(document.getElementById('baseFreq').value);
    const semitones = parseInt(document.getElementById('semitones').value);
    const system = document.getElementById('system').value;
    const instrument = document.getElementById('instrument').value;


    let frequencies = [];


    for (let i = 0; i < semitones; i++) {
        let freq;
        switch (system) {
            case 'equal':
                freq = baseFreq * Math.pow(2, i / 12);
                break;
            case 'pythagorean':
                freq = baseFreq * Math.pow(3/2, i % 12) * Math.pow(2, Math.floor(i / 12));
                break;
            case 'just':
                const justIntervals = [1, 16/15, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 9/5, 15/8];
                freq = baseFreq * justIntervals[i % 12] * Math.pow(2, Math.floor(i / 12));
                break;
        }
        frequencies.push(freq);
    }

    const canvas = document.getElementById('tuningCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxFreq = Math.max(...frequencies);
    const minFreq = Math.min(...frequencies);
    const margin = 40;


    const xScale = (canvas.width - 2 * margin) / (semitones - 1);
    const yScale = (canvas.height - 2 * margin) / (maxFreq - minFreq);

    ctx.beginPath();
    ctx.moveTo(margin, canvas.height - margin - (frequencies[0] - minFreq) * yScale);
    
    frequencies.forEach((freq, index) => {
        const x = margin + index * xScale;
        const y = canvas.height - margin - (freq - minFreq) * yScale;
        ctx.lineTo(x, y);
    });
    
    ctx.stroke();
    

    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText('Półtony', canvas.width / 2, canvas.height - 10);
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Częstotliwość (Hz)', -canvas.height / 2, 20);
    ctx.restore();


    frequencies.forEach((freq, index) => {
        const x = margin + index * xScale;
        const y = canvas.height - margin - (freq - minFreq) * yScale;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText(freq.toFixed(2) + ' Hz', x + 5, y - 5);
    });

    let additionalInfo = '';
    switch (instrument) {
        case 'piano':
            additionalInfo = 'Pianino ma szerokie pasmo częstotliwości od niskich do wysokich dźwięków.';
            break;
        case 'guitar':
            additionalInfo = 'Gitara najczęściej używa strojenia standardowego EADGBE.';
            break;
        case 'violin':
            additionalInfo = 'Skrzypce są strojone w kwintach: G, D, A, E.';
            break;
        case 'flute':
            additionalInfo = 'Flet jest strojony do tonacji C i ma zakres od C4 do C7.';
            break;
    }
    alert(additionalInfo);
});
