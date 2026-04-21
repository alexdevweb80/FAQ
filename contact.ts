// Webhook Discord URL
const WEBHOOK_URL = "https://discordapp.com/api/webhooks/1495737547026862182/AtrGqKVOPDScCQLA3YNMGVSNxwib5WU4dml4NIXdo03aoXt3Jv5BHTRF_MTvuUa7PyU5";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement;
    const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    const formStatus = document.getElementById('form-status') as HTMLDivElement;

    // Small TS Animation: Scale inputs slightly on focus
    const inputs = [nameInput, emailInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (input.parentElement) {
                input.parentElement.classList.add('input-focus-animate');
                input.style.transform = 'scale(1.02)';
                input.style.transition = 'transform 0.3s ease';
            }
        });

        input.addEventListener('blur', () => {
            if (input.parentElement) {
                input.parentElement.classList.remove('input-focus-animate');
                input.style.transform = 'scale(1)';
            }
        });
    });

    form.addEventListener('submit', async (e: Event) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            showStatus('Veuillez remplir tous les champs.', 'error');
            return;
        }

        // Animate button
        submitBtn.classList.add('button-loading');

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'Contact - alexdev',
                    embeds: [
                        {
                            title: '📩 Nouveau message de contact',
                            color: 5814783,
                            fields: [
                                { name: '👤 Nom', value: name, inline: true },
                                { name: '✉️ Email', value: email, inline: true },
                                { name: '📝 Message', value: message }
                            ],
                            footer: { text: 'alexdev - Formulaire de contact' },
                            timestamp: new Date().toISOString()
                        }
                    ]
                })
            });

            if (response.ok) {
                showStatus('Message envoyé avec succès !', 'success');
                form.reset();
            } else {
                showStatus('Erreur lors de l\'envoi du message.', 'error');
            }
        } catch (error) {
            showStatus('Erreur réseau. Impossible d\'envoyer.', 'error');
        } finally {
            // Revert button animation
            submitBtn.classList.remove('button-loading');
        }
    });

    function showStatus(text: string, type: 'success' | 'error') {
        formStatus.textContent = text;
        formStatus.className = `form-status ${type}`;
        formStatus.style.opacity = '1';

        // Animate status text
        formStatus.style.transform = 'translateY(10px)';
        setTimeout(() => formStatus.style.transform = 'translateY(0)', 50);

        setTimeout(() => {
            formStatus.style.opacity = '0';
        }, 5000);
    }
});
