"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const WEBHOOK_URL = "https://discordapp.com/api/webhooks/1495737547026862182/AtrGqKVOPDScCQLA3YNMGVSNxwib5WU4dml4NIXdo03aoXt3Jv5BHTRF_MTvuUa7PyU5";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
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
    form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        if (!name || !email || !message) {
            showStatus('Veuillez remplir tous les champs.', 'error');
            return;
        }
        submitBtn.classList.add('button-loading');
        try {
            const response = yield fetch(WEBHOOK_URL, {
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
            }
            else {
                showStatus('Erreur lors de l\'envoi du message.', 'error');
            }
        }
        catch (error) {
            showStatus('Erreur réseau. Impossible d\'envoyer.', 'error');
        }
        finally {
            submitBtn.classList.remove('button-loading');
        }
    }));
    function showStatus(text, type) {
        formStatus.textContent = text;
        formStatus.className = `form-status ${type}`;
        formStatus.style.opacity = '1';
        formStatus.style.transform = 'translateY(10px)';
        setTimeout(() => formStatus.style.transform = 'translateY(0)', 50);
        setTimeout(() => {
            formStatus.style.opacity = '0';
        }, 5000);
    }
});
