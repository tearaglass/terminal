// main.js

const input = document.getElementById("input");
const output = document.getElementById("output");
const trackName = document.getElementById("track-name");
const popupRoot = document.getElementById("popup-root");

const names = [
  "brkline", "venvox", "drail", "glyphid", "senvu", "nuller", "jxq", "obsidia",
  "fraylo", "zxenith", "loktra", "vexal", "primora", "arkn", "kropse", "wisker",
  "dowsyn", "quarn", "tilix", "vornyx", "glintr", "moudra", "oxryn", "chiff",
  "thazm", "remka", "yeltra", "fexin", "zardox", "vulnix", "luxend"
];

const playlist = names.map((name, i) => {
  const num = String(i + 1).padStart(3, '0');
  return {
    title: `${name} (${num})`,
    src: `assets/audio/${num}.mp3`
  };
});

let currentTrackIndex = 0;
const audioPlayer = new Audio();
audioPlayer.src = playlist[currentTrackIndex].src;
audioPlayer.loop = false;

audioPlayer.addEventListener("ended", () => {
  currentTrackIndex++;
  if (currentTrackIndex >= playlist.length) currentTrackIndex = 0;
  playTrack(currentTrackIndex);
});

window.addEventListener('beforeunload', () => {
  audioPlayer.pause();
});

async function playTrack(index) {
  const track = playlist[index];
  if (track) {
    try {
      const res = await fetch(track.src, { method: 'HEAD' });
      if (!res.ok) throw new Error('Track not found');
      audioPlayer.src = track.src;
      audioPlayer.play();
      trackName.textContent = track.title;
      logToTerminal(`🎵 Now playing: ${track.title}`);
      currentTrackIndex = index;
    } catch {
      logToTerminal(`Error: Could not load ${track.title}`);
    }
  }
}

function createPopup(title, content) {
  const popups = document.querySelectorAll('.popup');
  if (popups.length >= 5) {
    popups[0].remove();
  }
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.tabIndex = 0;
  popup.innerHTML = `
    <div class="popup-header" onmousedown="dragPopup(event, this)">
      <button aria-label="Close popup" onclick="this.closest('.popup').remove()">✖</button>
    </div>
    <div class="popup-content">${content}</div>
  `;
  popup.style.top = Math.min(Math.random() * 200 + 60, window.innerHeight - 250) + 'px';
  popup.style.left = Math.min(Math.random() * 200 + 60, window.innerWidth - 300) + 'px';
  popupRoot.appendChild(popup);
  popup.focus();
}

function createSamplerLab() {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="popup-header" onmousedown="dragPopup(event, this)">
      <span>🧪 Sampler Lab</span>
      <button onclick="this.closest('.popup').remove()">✖</button>
    </div>
    <div class="popup-content">
      <p><strong>Drop a playlist track here to edit!</strong></p>
      <div id="lab-track-name" style="margin-top: 0.5rem; color: #fcb8ec;"></div>
    </div>
  `;
  popup.style.top = '200px';
  popup.style.left = '200px';
  popupRoot.appendChild(popup);

  popup.addEventListener("dragover", e => e.preventDefault());
  popup.addEventListener("drop", e => {
    e.preventDefault();
    const src = e.dataTransfer.getData("audioSrc");
    const lab = popup.querySelector("#lab-track-name");
    if (lab) {
      const name = src.split('/').pop();
      lab.textContent = `🔊 Editing: ${name}`;
      logToTerminal(`Loaded into lab: ${name}`);
    }
  });
}

function dragPopup(e, handle) {
  const popup = handle.closest('.popup');
  const rect = popup.getBoundingClientRect();
  let shiftX = e.clientX - rect.left;
  let shiftY = e.clientY - rect.top;

  const moveAt = (pageX, pageY) => {
    const newX = Math.max(0, Math.min(pageX - shiftX, window.innerWidth - popup.offsetWidth));
    const newY = Math.max(0, Math.min(pageY - shiftY, window.innerHeight - popup.offsetHeight));
    popup.style.left = newX + 'px';
    popup.style.top = newY + 'px';
  };

  const onMouseMove = evt => moveAt(evt.pageX, evt.pageY);

  const cleanup = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', cleanup);
    document.removeEventListener('mouseleave', cleanup);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', cleanup);
  document.addEventListener('mouseleave', cleanup);
}

let commandHistory = [];
let historyIndex = -1;

if (localStorage.getItem("girlmode") === "true") {
  activateGirlmode();
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const command = input.value.trim().toLowerCase();
    if (command) {
      commandHistory.push(command);
      historyIndex = commandHistory.length;
      logToTerminal(`> ${command}`);
      const response = handleCommand(command);
      if (response) logToTerminal(response);
      input.value = "";
    }
  } else if (event.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[historyIndex];
    }
  } else if (event.key === "ArrowDown") {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      input.value = "";
    }
  }
});

function logToTerminal(text) {
  const p = document.createElement("p");
  p.className = "terminal-line";
  p.innerHTML = text;
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

async function loadFileContent(filename) {
  try {
    const res = await fetch(filename);
    if (!res.ok) throw new Error("File not found");
    const text = await res.text();
    logToTerminal("--- FILE START ---");
    text.split("\n").forEach(line => logToTerminal(line));
    logToTerminal("--- FILE END ---");
  } catch (err) {
    logToTerminal("Error: " + err.message);
  }
}

function handleCommand(cmd) {
  if (cmd === "archive") {
      document.body.classList.add('glitch');
      setTimeout(() => {
        window.location.href = 'archive/archive.html';
      }, 500);
      return `Opening ${cmd}...`;
  } else if (cmd === "summon") {
    document.body.classList.add('glitch');
    return `CLIO is sleeping...for now...`;
  } else if (cmd === "divine") {
    document.body.classList.add('glitch');
    setTimeout(() => {
      window.location.href = "divine.html";
    }, 500);
    return `Opening divine...`;
  } else if (cmd === "about") {
    const aboutSummary = `Delaney Mills: artist, taste engineer, rogue archivist.`;
    createPopup('About', `<p>${aboutSummary}</p>`);
    return null;
  } else if (cmd === "playlist") {
    const controls = `
      <div class="playlist-controls" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
        <button onclick="playTrack((currentTrackIndex - 1 + playlist.length) % playlist.length)" aria-label="Previous Track">⇦</button>
        <button onclick="audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause()" aria-label="Play/Pause">❁</button>
        <button onclick="playTrack((currentTrackIndex + 1) % playlist.length)" aria-label="Next Track">⇨</button>
      </div>
    `;
    const listItems = playlist.map((song, i) => 
      `<div style="display: flex; align-items: center; gap: 0.25rem;">
        <span style="cursor: grab;" title="Drag to Lab" draggable="true" ondragstart="event.dataTransfer.setData('audioSrc', '${song.src}')">➰</span>
        <a href="#" onclick="playTrack(${i}); return false;" class="song-link ${i === currentTrackIndex ? 'current-song' : ''}" role="button" aria-label="Play ${song.title}">
          ${i + 1}. ${song.title}
        </a>
      </div>`
    ).join('');
    createPopup('playlist', `${controls}${listItems}`);
    return null;
  } else if (cmd === "lab") {
    createSamplerLab();
    return null;
  } else if (cmd.startsWith("play")) {
    const parts = cmd.split(" ");
    const index = parseInt(parts[1], 10) - 1;
    if (!isNaN(index) && playlist[index]) {
      currentTrackIndex = index;
      playTrack(currentTrackIndex);
    } else {
      return "Usage: play [number] — type 'playlist' to see available tracks.";
    }
    return null;
  } else if (cmd === "clear") {
    output.innerHTML = "";
    popupRoot.innerHTML = "";
    return "Cleared terminal and popups.";
  } else if (cmd === "girlmode") {
    activateGirlmode();
    localStorage.setItem("girlmode", "true");
    return "Girlmode activated.";
  } else if (cmd === "boymode") {
    deactivateGirlmode();
    localStorage.setItem("girlmode", "false");
    return "Girlmode deactivated.";
  } else if (cmd === "help") {
    const helpText = `available commands:
★ about
★ archive
★ summon
★ playlist
★ lab
★ girlmode
★ boymode
★ clear
★ help`;
    createPopup('Help', `<pre>${helpText}</pre>`);
    return null;
  } else {
    return "Unknown command. Try again.";
  }
}

function activateGirlmode() {
  document.body.classList.add("girlmode");
}

function deactivateGirlmode() {
  document.body.classList.remove("girlmode");
}
