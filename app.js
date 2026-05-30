/**
 * InstaCheck — Atelier Zero Edition
 * Mobile-first, animated reveals, local processing
 */
'use strict';

const DOM = {
    followersInput: document.getElementById('followers-input'),
    followingInput: document.getElementById('following-input'),
    followersLabel: document.getElementById('followers-label'),
    followingLabel: document.getElementById('following-label'),
    followersStatus: document.getElementById('followers-status'),
    followingStatus: document.getElementById('following-status'),
    followersZone: document.getElementById('followers-zone'),
    followingZone: document.getElementById('following-zone'),
    analyzeBtn: document.getElementById('analyze-btn'),
    resetBtn: document.getElementById('reset-btn'),
    resultsSection: document.getElementById('results'),
    resultsList: document.getElementById('results-list'),
    resultsSummary: document.getElementById('results-summary'),
    badgeNotFollowingBack: document.getElementById('badge-not-following-back'),
    badgeNotFollowedBack: document.getElementById('badge-not-followed-back'),
    exportBtn: document.getElementById('export-btn'),
};

let followersData = null;
let followingData = null;
let activeTab = 'not-following-back';
let currentResults = { notFollowingBack: [], notFollowedBack: [] };

// SVG icons
const icons = {
    user: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5a5448" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6e7448" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    alert: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ed6f5c" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
};

// Utility
const extractUsernames = (data, sourceType) => {
    const usernames = new Set();
    try {
        if (sourceType === 'followers') {
            for (const entry of data) {
                const listData = entry?.string_list_data;
                if (Array.isArray(listData))
                    for (const item of listData) {
                        const u = item?.value?.trim();
                        if (u) usernames.add(u.toLowerCase());
                    }
            }
        } else if (sourceType === 'following') {
            const followingList = data?.relationships_following;
            if (Array.isArray(followingList))
                for (const entry of followingList) {
                    const listData = entry?.string_list_data;
                    if (Array.isArray(listData))
                        for (const item of listData) {
                            const u = item?.value?.trim();
                            if (u) usernames.add(u.toLowerCase());
                        }
                }
        }
    } catch (err) { console.error(err); return null; }
    return usernames;
};

const readFileAsJSON = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        try { resolve(JSON.parse(e.target.result)); }
        catch (err) { reject(new Error('Format JSON tidak valid.')); }
    };
    reader.onerror = () => reject(new Error('Gagal membaca file.'));
    reader.readAsText(file);
});

const setStatus = (zone, statusEl, labelEl, fileName, success, message = '') => {
    zone.classList.remove('card-loaded', 'card-error');
    statusEl.classList.remove('success', 'error');
    statusEl.innerHTML = '';
    if (success) {
        zone.classList.add('card-loaded');
        statusEl.classList.add('success');
        statusEl.innerHTML = `${icons.check} ${fileName} · berhasil`;
        labelEl.textContent = fileName;
    } else {
        zone.classList.add('card-error');
        statusEl.classList.add('error');
        statusEl.innerHTML = `${icons.alert} ${message}`;
    }
};

const checkReady = () => {
    const ready = followersData !== null && followingData !== null;
    DOM.analyzeBtn.disabled = !ready;
    if (ready) DOM.resetBtn.style.display = 'inline-flex';
};

// File handling
const handleFile = async (file, sourceType) => {
    const zone = sourceType === 'followers' ? DOM.followersZone : DOM.followingZone;
    const statusEl = sourceType === 'followers' ? DOM.followersStatus : DOM.followingStatus;
    const labelEl = sourceType === 'followers' ? DOM.followersLabel : DOM.followingLabel;
    if (!file) return;
    if (!file.name.endsWith('.json')) {
        setStatus(zone, statusEl, labelEl, file.name, false, 'Hanya .json');
        if (sourceType === 'followers') followersData = null;
        else followingData = null;
        checkReady();
        return;
    }
    try {
        const json = await readFileAsJSON(file);
        const usernames = extractUsernames(json, sourceType);
        if (!usernames || usernames.size === 0) throw new Error('Data kosong atau format salah.');
        if (sourceType === 'followers') followersData = usernames;
        else followingData = usernames;
        setStatus(zone, statusEl, labelEl, file.name, true);
    } catch (err) {
        setStatus(zone, statusEl, labelEl, file.name, false, err.message);
        if (sourceType === 'followers') followersData = null;
        else followingData = null;
    }
    checkReady();
};

DOM.followersInput.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0], 'followers'); });
DOM.followingInput.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0], 'following'); });

// Drag & drop
['followers', 'following'].forEach(type => {
    const zone = type === 'followers' ? DOM.followersZone.querySelector('.upload-zone') : DOM.followingZone.querySelector('.upload-zone');
    zone.addEventListener('dragover', (e) => e.preventDefault());
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const input = type === 'followers' ? DOM.followersInput : DOM.followingInput;
            const dt = new DataTransfer();
            dt.items.add(file);
            input.files = dt.files;
            handleFile(file, type);
        }
    });
});

// Analysis
const analyze = () => {
    if (!followersData || !followingData) return;
    const notFollowingBack = [...followingData].filter(u => !followersData.has(u)).sort();
    const notFollowedBack = [...followersData].filter(u => !followingData.has(u)).sort();
    currentResults = { notFollowingBack, notFollowedBack };

    DOM.badgeNotFollowingBack.textContent = notFollowingBack.length;
    DOM.badgeNotFollowedBack.textContent = notFollowedBack.length;
    DOM.resultsSection.style.display = 'block';

    // Render rings
    DOM.resultsSummary.innerHTML = `
        <div class="stat-ring"><span class="ring-val">${followingData.size}</span><span class="ring-label">Following</span></div>
        <div class="stat-ring"><span class="ring-val">${followersData.size}</span><span class="ring-label">Followers</span></div>
        <div class="stat-ring highlight"><span class="ring-val">${notFollowingBack.length}</span><span class="ring-label">Tidak balik</span></div>
        <div class="stat-ring"><span class="ring-val">${notFollowedBack.length}</span><span class="ring-label">Tidak diikuti</span></div>
    `;

    renderTab(activeTab);
    DOM.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const renderTab = (tab) => {
    activeTab = tab;
    const list = tab === 'not-following-back' ? currentResults.notFollowingBack : currentResults.notFollowedBack;
    DOM.resultsList.innerHTML = '';

    if (list.length === 0) {
        DOM.resultsList.innerHTML = `<div class="result-empty">Semua akun sudah berteman balik.</div>`;
        return;
    }

    list.forEach((username, index) => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.style.animation = `fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) ${index * 0.03}s both`;
        item.innerHTML = `<div class="result-avatar">${icons.user}</div><span class="result-username">@${username}</span>`;
        DOM.resultsList.appendChild(item);
    });
};

// Inject animation keyframes dynamically (if not present)
if (!document.getElementById('anim-keyframes')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'anim-keyframes';
    styleSheet.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);
}

DOM.analyzeBtn.addEventListener('click', analyze);

// Tabs
document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
        document.querySelectorAll('.pill').forEach(p => { p.classList.remove('tab--active'); p.setAttribute('aria-selected','false'); });
        pill.classList.add('tab--active');
        pill.setAttribute('aria-selected','true');
        renderTab(pill.dataset.tab);
    });
});

// Reset
DOM.resetBtn.addEventListener('click', () => {
    followersData = followingData = null;
    currentResults = { notFollowingBack: [], notFollowedBack: [] };
    DOM.followersInput.value = '';
    DOM.followingInput.value = '';
    DOM.followersLabel.textContent = 'Pilih file';
    DOM.followingLabel.textContent = 'Pilih file';
    DOM.followersStatus.innerHTML = '';
    DOM.followingStatus.innerHTML = '';
    DOM.followersZone.classList.remove('card-loaded','card-error');
    DOM.followingZone.classList.remove('card-loaded','card-error');
    DOM.followersStatus.classList.remove('success','error');
    DOM.followingStatus.classList.remove('success','error');
    DOM.resultsSection.style.display = 'none';
    DOM.analyzeBtn.disabled = true;
    DOM.resetBtn.style.display = 'none';
    DOM.badgeNotFollowingBack.textContent = '0';
    DOM.badgeNotFollowedBack.textContent = '0';
    DOM.resultsSummary.innerHTML = '';
    DOM.resultsList.innerHTML = '';
    document.querySelectorAll('.pill').forEach((p,i) => {
        p.classList.toggle('tab--active', i===0);
        p.setAttribute('aria-selected', i===0 ? 'true':'false');
    });
    activeTab = 'not-following-back';
});

// Export
DOM.exportBtn.addEventListener('click', () => {
    const list = activeTab === 'not-following-back' ? currentResults.notFollowingBack : currentResults.notFollowedBack;
    if (list.length === 0) { alert('Tidak ada data.'); return; }
    const label = activeTab === 'not-following-back' ? 'Kamu follow, mereka tidak' : 'Mereka follow, kamu tidak';
    const date = new Date().toISOString().slice(0,10);
    let content = `InstaCheck · ${label}\nTanggal: ${date}\nTotal: ${list.length} akun\n\n`;
    content += list.map(u => `@${u}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instacheck-${date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
});

// ---- Scroll Reveal Observer (mobile-friendly) ----
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    revealElements.forEach(el => observer.observe(el));
}