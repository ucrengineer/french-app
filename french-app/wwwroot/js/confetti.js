// Lightweight confetti effect (no third-party libs)
// Renders into a full-screen canvas for a short burst.

(function () {
    const ensureCanvas = () => {
        let canvas = document.getElementById('confettiCanvas');
        if (canvas) return canvas;

        canvas = document.createElement('canvas');
        canvas.id = 'confettiCanvas';
        canvas.style.position = 'fixed';
        canvas.style.inset = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '2000';
        document.body.appendChild(canvas);
        return canvas;
    };

    const resizeCanvas = (canvas) => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        const ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return ctx;
    };

    const rand = (min, max) => min + Math.random() * (max - min);

    window.showConfettiBurst = function (options) {
        const opts = options || {};
        const durationMs = typeof opts.durationMs === 'number' ? opts.durationMs : 900;
        const count = typeof opts.count === 'number' ? opts.count : 130;
        const gravity = typeof opts.gravity === 'number' ? opts.gravity : 900; // px/s^2
        const spread = typeof opts.spread === 'number' ? opts.spread : Math.PI * 0.8;

        const colors = Array.isArray(opts.colors) && opts.colors.length
            ? opts.colors
            : ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#20c997'];

        const canvas = ensureCanvas();
        const ctx = resizeCanvas(canvas);

        const originX = typeof opts.x === 'number' ? opts.x : window.innerWidth / 2;
        const originY = typeof opts.y === 'number' ? opts.y : 80;

        const particles = [];
        for (let i = 0; i < count; i++) {
            const angle = -Math.PI / 2 + rand(-spread / 2, spread / 2);
            const speed = rand(420, 980);
            particles.push({
                x: originX,
                y: originY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: rand(4, 9),
                rot: rand(0, Math.PI * 2),
                vr: rand(-8, 8),
                shape: Math.random() < 0.35 ? 'circle' : 'rect',
                color: colors[(Math.random() * colors.length) | 0],
                life: durationMs + rand(-200, 200)
            });
        }

        let start = null;
        let raf = null;

        const onResize = () => resizeCanvas(canvas);
        window.addEventListener('resize', onResize);

        const tick = (t) => {
            if (start === null) start = t;
            const dt = Math.min(0.033, (t - (tick._last || t)) / 1000);
            tick._last = t;

            const elapsed = t - start;

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (const p of particles) {
                p.vy += gravity * dt;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.rot += p.vr * dt;
                p.life -= dt * 1000;

                if (p.life <= 0) continue;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;

                if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size * 0.55, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                }

                ctx.restore();
            }

            if (elapsed < durationMs) {
                raf = requestAnimationFrame(tick);
                return;
            }

            // Cleanup
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            window.removeEventListener('resize', onResize);
            if (canvas && canvas.parentElement) {
                canvas.parentElement.removeChild(canvas);
            }
        };

        raf = requestAnimationFrame(tick);

        return {
            dispose: () => {
                if (raf) cancelAnimationFrame(raf);
                window.removeEventListener('resize', onResize);
                if (canvas && canvas.parentElement) canvas.parentElement.removeChild(canvas);
            }
        };
    };
})();
