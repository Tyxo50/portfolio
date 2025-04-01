const spinnerFrames = ["|", "/", "-", "\\"];
let spinnerIndex = 0;

function animateSpinner() {
  const spinner = document.getElementById("spinner");
  if (!spinner) return;
  spinner.textContent = spinnerFrames[spinnerIndex % spinnerFrames.length];
  spinnerIndex++;
  setTimeout(animateSpinner, 120);
}

new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) {
    animateSpinner();
    obs.disconnect();
  }
}, { threshold: 0.5 }).observe(document.getElementById("moreabout"));

const manLines = [
  "NAME",
  "    Lelievre_Tom - Cybersecurity student and creative developer",
  "",
  "DESCRIPTION",
  "    Passionate about cybersecurity, ethical hacking, and building",
  "    secure and elegant solutions with Python/C, C++, Linux.",
  "    Frequently explores offensive security techniques and embedded systems like Raspberry Pi.",
  "    Focused on automation, scripting, and efficient cybersecurity workflows.",
  "    Enjoys creating interactive and engaging web applications.",
  "",
  "FORMATION",
  "    Currently pursuing a Master's in Cybersecurity at UQAC (Université du Québec à Chicoutimi).",
  "    Engineering degree in progress at ISEN Caen, France.",
  "    Looking for a 1-year cybersecurity apprenticeship starting October 2025.",
];

const skillLines = [
  "CYBERSECURITY",
  "    Linux, Wireshark, TCP/IP, VPN, Cryptography,Firewalls, IDS/IPS, SIEM, Forensics, Autopsy",
  "",
  "DEVELOPMENT",
  "    Python, C, C++, JS, PHP, HTML/CSS, R, SQL",
  "",
  "AI & TOOLS",
  "    TensorFlow,PyTorch, Scikit-learn, CUDA, Docker, Git, GitHub",
  "    PostgreSQL, My SQL, The Things Stack, Grafana InfluxDB",
];

const projectsCommand = "fetch-projects --source github --user TomLelievre";
const projectsData = [
  {
    name: "PenTest Lab - Internal Network Exploitation",
    desc: "Custom vulnerable network designed and deployed for pentesting practice.",
    url: ""
  },
  {
    name: "ClaviSure",
    desc: "Python app using typing biometrics to authenticate users continuously. Built with Python, Flask, JavaScript. Implements ML classification.",
    url: "https://github.com/Elouaaaan/ClaviSure"
  },
  {
    name: "Secure File Sharing Platform",
    desc: "Web app to share files securely using cryptographic protocols. User authentication, file encryption, secure download links.",
    url: "https://github.com/Elouaaaan/app-secu-info"
  },
  {
    name: "Forensic Challenge – DFIRWS",
    desc: "Digital forensics investigation challenge (DFRWS event).",
    url: ""
  },
  {
    name: "Tree Age & Storm Risk Prediction",
    desc: "AI web app predicting tree age & risk of uprooting during storms.",
    url: "https://github.com/eltar14/projet_web_S6"
  },
  {
    name: "Web Music App",
    desc: "Spotify-like project to stream and explore music.",
    url: "https://github.com/Goustan-Sermon/Final_project_CIR2"
  },
  {
    name: "IoT Cold Room Alert System ",
    desc: "Sensors monitor temperature/humidity. Alerts via MQTT + Grafana dashboard.",
    url: ""
  }
];

function formatManLine(line) {
  const sections = ["NAME", "DESCRIPTION", "FORMATION"];
  if (sections.includes(line)) return `<span class="white" style="text-decoration: underline;">${line}</span>`;
  if (line.includes("Looking for a 1-year")) return `<span class="blue" style="font-weight: bold;">${line}</span>`;
  if (line.trim() === "") return "&nbsp;";
  return `<span class="grey">${line}</span>`;
}

function animateManCommandAndPage() {
  const manBox = document.getElementById("man-text");
  manBox.innerHTML = "";

  const promptLine = document.createElement("p");
  promptLine.innerHTML = `<span class="green">T0m_Lel13vr3@portfolio</span>:<span class="blue">~</span>$ <span id="typed-command" class="white"></span><span class="cursor">█</span>`;
  manBox.appendChild(promptLine);

  const command = "man Lelievre_Tom";
  let i = 0;

  function typeCommand() {
    const span = document.getElementById("typed-command");
    if (i < command.length) {
      span.textContent += command.charAt(i);
      i++;
      setTimeout(typeCommand, 80);
    } else {
      document.querySelector(".cursor").remove();
      document.querySelector(".profile-pic")?.classList.add("visible");
      setTimeout(() => typeManContent(), 400);
    }
  }

  function typeManContent() {
    let index = 0;
    function typeNextLine() {
      if (index < manLines.length) {
        const line = document.createElement("p");
        line.innerHTML = formatManLine(manLines[index]);
        manBox.appendChild(line);
        index++;
        setTimeout(typeNextLine, 130);
      }
    }
    typeNextLine();
  }

  setTimeout(typeCommand, 600);
}

function animateSkillsCommandAndOutput() {
  const box = document.getElementById("skills").querySelector(".terminal-full-content");
  box.innerHTML = "";

  const prompt = document.createElement("p");
  prompt.innerHTML = `<span class="green">T0m_Lel13vr3@portfolio</span>:<span class="blue">~</span>$ <span id="typed-skill-cmd" class="white"></span><span class="cursor">█</span>`;
  box.appendChild(prompt);

  const command = "cat skills.txt";
  let i = 0;

  function typeCommand() {
    const span = document.getElementById("typed-skill-cmd");
    if (i < command.length) {
      span.textContent += command.charAt(i);
      i++;
      setTimeout(typeCommand, 80);
    } else {
      document.querySelector("#skills .cursor").remove();
      setTimeout(typeSkillLines, 400);
    }
  }

  function typeSkillLines() {
    let index = 0;
    function typeNextLine() {
      if (index < skillLines.length) {
        const line = document.createElement("p");
        const text = skillLines[index];
        if (text.trim() === "") {
          line.innerHTML = "&nbsp;";
        } else if (["CYBERSECURITY", "DEVELOPMENT", "AI & TOOLS"].includes(text)) {
          line.innerHTML = `<span class="white" style="text-decoration: underline;">${text}</span>`;
        } else {
          line.innerHTML = `<span class="grey">${text}</span>`;
        }
        box.appendChild(line);
        index++;
        setTimeout(typeNextLine, 120);
      }
    }
    typeNextLine();
  }

  typeCommand();
}

function typeProjectsCommand() {
  const output = document.getElementById("projects-output");
  output.innerHTML = `<p><span class="green">T0m_Lel13vr3@portfolio</span>:<span class="blue">~</span>$ <span id="typed-cmd-projects" class="white"></span><span class="cursor">█</span></p>`;
  const cmdEl = document.getElementById("typed-cmd-projects");
  let i = 0;

  function typeChar() {
    if (i < projectsCommand.length) {
      cmdEl.textContent += projectsCommand.charAt(i);
      i++;
      setTimeout(typeChar, 60);
    } else {
      document.querySelector("#typed-cmd-projects + .cursor").remove();
      simulateProjectList();
    }
  }

  typeChar();
}

function simulateProjectList() {
  const output = document.getElementById("projects-output");
  let index = 0;

  function addNext() {
    if (index < projectsData.length) {
      const p = projectsData[index];
      const el = document.createElement("p");
      el.innerHTML = `<span class="blue">→ ${p.name}</span><br><span class="grey">${p.desc}</span><br><a href="${p.url}" target="_blank" class="green">${p.url}</a>`;
      output.appendChild(el);
      index++;
      setTimeout(addNext, 600);
    }
  }

  setTimeout(addNext, 400);
}

const contactCommand = "./contact_me.exe";
function typeContactCommand() {
  const output = document.getElementById("contact-output");
  output.innerHTML = `
    <p><span class="green">T0m_Lel13vr3@portfolio</span>:<span class="blue">~</span>$ <span id="typed-cmd-contact" class="white"></span><span class="cursor">█</span></p>
  `;
  const cmdEl = document.getElementById("typed-cmd-contact");
  let i = 0;

  function typeChar() {
    if (i < contactCommand.length) {
      cmdEl.textContent += contactCommand.charAt(i);
      i++;
      setTimeout(typeChar, 60);
    } else {
      document.querySelector("#typed-cmd-contact + .cursor").remove();
      displayContactForm();
    }
  }

  typeChar();
}

function displayContactForm() {
  const container = document.getElementById("contact-output");

  const form = document.createElement("form");
  form.className = "contact-form-terminal";

  form.innerHTML = `
    <div class="terminal-line">
      <label class="inline-label">
        <span class="white">Your name ></span>
        <input type="text" name="name" required placeholder="Enter your name" />
      </label>
    </div>
    <div class="terminal-line">
      <label class="inline-label">
        <span class="white">Your email ></span>
        <input type="email" name="email" required placeholder="Enter your email" />
      </label>
    </div>
    <div class="terminal-line">
      <label class="inline-label">
        <span class="white">Your message ></span>
        <textarea name="message" rows="3" required placeholder="Enter your message"></textarea>
      </label>
    </div>
    <div class="terminal-line">
      <button type="submit" class="contact-form-terminal-button">CTRL+X to send</button>
    </div>
    <div class="terminal-line">
      <p id="email-status" class="grey"></p>
    </div>
  `;

  container.appendChild(form);

  form.querySelectorAll("input, textarea").forEach(el => {
    el.style.background = "none";
    el.style.border = "none";
    el.style.color = "#33ff33";
    el.style.outline = "none";
    el.style.fontFamily = "'Courier New', monospace";
    el.style.fontSize = "1rem";
    el.style.marginLeft = "10px";
    el.style.width = "calc(100% - 120px)";
    el.style.resize = "none";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const statusEl = document.getElementById("email-status");
    let dots = 0;
    statusEl.textContent = "Soumission en cours";
    const anim = setInterval(() => {
      dots = (dots + 1) % 4;
      statusEl.textContent = "Soumission en cours" + ".".repeat(dots);
    }, 400);

    
  });
}


function setupTabSystem() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      document.getElementById(target).classList.add('active');

      document.getElementById("man-text").innerHTML = "";
      document.getElementById("skills").querySelector(".terminal-full-content").innerHTML = "";
      document.getElementById("projects-output").innerHTML = "";
      document.querySelector('.profile-pic')?.classList.remove('visible');

      if (target === "infos") animateManCommandAndPage();
      if (target === "skills") animateSkillsCommandAndOutput();
      if (target === "projects") typeProjectsCommand();
      if (target === "contact") typeContactCommand();
    });
  });

  document.querySelectorAll('a[data-open-tab]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const tab = link.getAttribute('data-open-tab');
      const section = document.getElementById("moreabout");
      const tabBtn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
      const tabPane = document.getElementById(tab);

      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      tabBtn?.classList.add('active');
      tabPane?.classList.add('active');

      section.scrollIntoView({ behavior: "smooth" });

      new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          document.getElementById("man-text").innerHTML = "";
          document.querySelector("#skills .terminal-full-content").innerHTML = "";
          document.getElementById("projects-output").innerHTML = "";
          document.querySelector(".profile-pic")?.classList.remove("visible");

          if (tab === "infos") animateManCommandAndPage();
          if (tab === "skills") animateSkillsCommandAndOutput();
          if (tab === "projects") typeProjectsCommand();
          if (tab === "contact") typeContactCommand();

          observer.disconnect();
        }
      }, { threshold: 0.3 }).observe(section);
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupTabSystem();
});

new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      const isInfoActive = document.querySelector('.tab-btn[data-tab="infos"]').classList.contains("active");
      const alreadyFilled = document.getElementById("man-text").children.length > 0;
  
      if (isInfoActive && !alreadyFilled) {
        animateManCommandAndPage();
      }
      observer.disconnect();
    }
  }, { threshold: 0.4 }).observe(document.getElementById("moreabout"));
