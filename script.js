// --- Master Data File ---
const friendsData = {
    "Manmeet": { 
        nickname: "JAI BHEEM", code: "6969", since: "2018-05-15",
        message: "Manmeet, you were one of the first to join this chaotic journey. Here's to all the questionable decisions we've made.",
        future: "Dear Future Manmeet, I hope you're still as bold and ridiculous as ever. Keep fighting the good fight."
    },
    "Sahil": { 
        nickname: "GURU JI", code: "1414", since: "2019-02-10",
        message: "Guru Ji, the source of all our terrible advice and endless laughter.",
        future: "Dear Future Sahil, May your wisdom continue to guide (or misguide) us all."
    },
    "Saurabh": { 
        nickname: "BAAL MITHAI", code: "8080", since: "2017-10-05",
        message: "Saurabh, the absolute sweetest yet most chaotic person in the room.",
        future: "Dear Future Saurabh, Never lose that sweetness, but maybe manage the chaos."
    },
    "Harshita": { 
        nickname: "BHAI", code: "1010", since: "2020-01-20",
        message: "Bhai, the true MVP of the group. Always there, always solid.",
        future: "Dear Future Harshita, Stay strong, stay loyal, and keep being the rock."
    },
    "Smriti": { 
        nickname: "TUBELIGHT", code: "3333", since: "2018-08-12",
        message: "Smriti, it might take you a second to get the joke, but we love you anyway.",
        future: "Dear Future Smriti, I hope the bulb is shining a bit brighter these days!"
    },
    "Rishu": { 
        nickname: "TATAKAE TATAKAE", code: "4545", since: "2021-03-05",
        message: "Rishu, always ready to fight for whatever random cause we stumble upon.",
        future: "Dear Future Rishu, Keep fighting. Tatakae!"
    },
    "Aarti": { 
        nickname: "NANGLI DAIRY", code: "2525", since: "2016-11-18",
        message: "Aarti, bringing that specific energy that nobody else can replicate.",
        future: "Dear Future Aarti, I hope you're still bringing the premium drama."
    },
    "Rahul": { 
        nickname: "RIZZ", code: "9090", since: "2019-09-09",
        message: "Rahul, smoother than you have any right to be.",
        future: "Dear Future Rahul, Save some rizz for the rest of us."
    },
    "Dheeraj": { 
        nickname: "DRJ", code: "7070", since: "2017-04-14",
        message: "Dheeraj, the man, the myth, the absolute legend.",
        future: "Dear Future Dheeraj, Keep thriving, my friend."
    }
};

const YOUR_PHONE_NUMBER = "1234567890"; // REPLACE WITH ACTUAL NUMBER

// --- DOM Elements ---
const landingPage = document.getElementById('landing-page');
const selectionScreen = document.getElementById('selection-screen');
const friendPage = document.getElementById('friend-page');
const passwordModal = document.getElementById('password-modal');

let currentFriend = null;
let counterInterval = null;

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    buildFriendGrid();
});

// Navigation Functions
document.getElementById('enter-btn').addEventListener('click', () => {
    landingPage.classList.add('hidden');
    selectionScreen.classList.remove('hidden');
});

document.getElementById('return-btn').addEventListener('click', () => {
    friendPage.classList.add('hidden');
    selectionScreen.classList.remove('hidden');
    if(counterInterval) clearInterval(counterInterval);
    document.getElementById('envelope').classList.remove('open');
});

// --- Build Selection Grid ---
function buildFriendGrid() {
    const grid = document.getElementById('friend-grid');
    for (const [name, data] of Object.entries(friendsData)) {
        const card = document.createElement('div');
        card.className = 'friend-card';
        card.innerHTML = `
            <div class="card-img-placeholder">Photo</div>
            <h3 class="friend-name">${name}</h3>
            <p class="friend-nickname">${data.nickname}</p>
        `;
        card.addEventListener('click', () => openPasswordModal(name));
        grid.appendChild(card);
    }
}

// --- Password Logic ---
function openPasswordModal(name) {
    currentFriend = name;
    document.getElementById('modal-friend-name').textContent = `Identity: ${name}`;
    document.getElementById('secret-code-input').value = '';
    document.getElementById('password-error').classList.add('hidden');
    passwordModal.classList.remove('hidden');
}

document.getElementById('cancel-login').addEventListener('click', () => {
    passwordModal.classList.add('hidden');
});

document.getElementById('submit-login').addEventListener('click', () => {
    const inputCode = document.getElementById('secret-code-input').value;
    if (inputCode === friendsData[currentFriend].code) {
        passwordModal.classList.add('hidden');
        loadFriendPage(currentFriend);
    } else {
        document.getElementById('password-error').classList.remove('hidden');
    }
});

// --- Load Friend Page ---
function loadFriendPage(name) {
    selectionScreen.classList.add('hidden');
    friendPage.classList.remove('hidden');
    
    const data = friendsData[name];

    // Populate Hero
    document.getElementById('fp-greeting').textContent = `Dear ${name}`;
    
    // Typewriter effect
    const msgEl = document.getElementById('fp-message');
    msgEl.innerHTML = '';
    let i = 0;
    function typeWriter() {
        if (i < data.message.length) {
            msgEl.innerHTML += data.message.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        }
    }
    setTimeout(typeWriter, 500);

    // Populate Counter
    document.getElementById('fp-date').textContent = data.since;
    startCounter(data.since);

    // Populate Timeline (Placeholders)
    const timeline = document.getElementById('fp-timeline');
    timeline.innerHTML = '';
    for(let j=1; j<=4; j++) {
        timeline.innerHTML += `
            <div class="timeline-card ${j%2===0 ? 'right' : 'left'}">
                <div class="timeline-content">
                    <div class="timeline-photo">[Photo Placeholder ${j}]</div>
                    <h4 class="serif-title">Memory ${j}</h4>
                    <p class="body-text" style="font-size:0.85rem; margin-bottom:0;">Description of a chaotic event goes here.</p>
                </div>
            </div>`;
    }

    // Populate Gallery
    const gallery = document.getElementById('fp-gallery');
    gallery.innerHTML = '';
    for(let j=1; j<=4; j++) {
        gallery.innerHTML += `
            <div class="polaroid" onclick="openLightbox(this)">
                <div class="polaroid-img"></div>
                <div class="polaroid-caption">Captured Moment ${j}<br><small style="font-size:0.7rem; color:#888;">Date</small></div>
            </div>`;
    }

    // Populate Letter
    document.getElementById('fp-letter').textContent = data.future;

    // Set WhatsApp
    document.getElementById('whatsapp-btn').onclick = () => {
        const text = encodeURIComponent(`Hey Shanu, I just unlocked my Friendship Forest page and wanted to say...`);
        window.open(`https://wa.me/${YOUR_PHONE_NUMBER}?text=${text}`, '_blank');
    };
}

// --- Live Counter ---
function startCounter(dateString) {
    if(counterInterval) clearInterval(counterInterval);
    const startDate = new Date(dateString);

    function update() {
        const now = new Date();
        const diff = now - startDate;

        const dateObj = new Date(diff);
        const years = Math.abs(dateObj.getUTCFullYear() - 1970);
        const months = dateObj.getUTCMonth();
        const days = dateObj.getUTCDate() - 1;

        document.getElementById('count-years').textContent = years;
        document.getElementById('count-months').textContent = months;
        document.getElementById('count-days').textContent = days;
    }
    update();
    counterInterval = setInterval(update, 86400000); // Update daily
}

// --- Interactions ---
// Envelope
document.getElementById('envelope').addEventListener('click', function() {
    this.classList.toggle('open');
});

// Lightbox
const lightbox = document.getElementById('lightbox');
function openLightbox(el) {
    const caption = el.querySelector('.polaroid-caption').innerHTML;
    document.getElementById('lightbox-caption').innerHTML = caption;
    lightbox.classList.remove('hidden');
}
document.querySelector('.close-lightbox').addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

// --- Firefly Particle System ---
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = window.innerWidth < 600 ? 30 : 70;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = (Math.random() * 0.5) + 0.1; 
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y -= this.speedY; // Move upwards
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
