const lines = [
    { type: "system", text: "[ OK ] Initializing portfolio modules..." },
    { type: "system", text: "[ OK ] Mounting /home" },
    { type: "system", text: "[ OK ] Login as T0m_Lel13vr3@portfolio" },
    { type: "prompt", path: "~", command: "cd portfolio" },
    { type: "prompt", path: "~/portfolio", command: "ls" },
    { type: "system", text: "start.sh  assets  config" },
    { type: "prompt", path: "~/portfolio", command: "./start.sh" },
    { type: "system", text: "Loading portfolio..." },
    { type: "system", text: "Launching UI..." },
    { type: "progress" },
  ];
  
  const output = document.getElementById("boot-screen");
  let lineIndex = 0;
  
  // Delays
  const charDelay = 100;         // vitesse de frappe
  const delaySystemLine = 100;  // délai après une ligne système
  const delayAfterCommand = 100; // délai après une commande
  
  function typeCommand(prompt, command, callback) {
    let i = 0;
    const base = `<span class="user">T0m_Lel13vr3@portfolio:</span><span class="path">${prompt}</span>$ `;
    const lineContainer = document.createElement("div");
    lineContainer.innerHTML = base;
    output.appendChild(lineContainer);
  
    const commandSpan = document.createElement("span");
    commandSpan.className = "command";
    lineContainer.appendChild(commandSpan);
  
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.textContent = "█";
    lineContainer.appendChild(cursor);
  
    const interval = setInterval(() => {
      commandSpan.textContent += command.charAt(i);
      i++;
      if (i >= command.length) {
        clearInterval(interval);
        lineContainer.removeChild(cursor);
        output.innerHTML += "\n";
        setTimeout(callback, delayAfterCommand);
      }
    }, charDelay);
  }
  
  function showProgressBar(callback) {
    const progressLine = document.createElement("div");
    output.appendChild(progressLine);
  
    let progress = 0;
    const total = 20;
  
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 3) + 1; // +1 à +3%
      if (progress > 100) progress = 100;
  
      const filledBars = Math.floor((progress / 100) * total);
      const emptyBars = total - filledBars;
  
      const bar =
        "[" +
        "=".repeat(filledBars) +
        " ".repeat(emptyBars) +
        "]  " +
        progress +
        "%";
  
      progressLine.textContent = bar;
  
      if (progress >= 100) {
        clearInterval(interval);
        progressLine.textContent = bar;
        output.innerHTML += "\n";
        setTimeout(callback, 1500);
      }
    }, 50);
  }
  
  function processLines() {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        window.location.href = "portfolio.html"; // À adapter si tu veux afficher le reste sur la même page
      }, 100);
      return;
    }
  
    const line = lines[lineIndex];
    lineIndex++;
  
    if (line.type === "system") {
      output.innerHTML += line.text + "\n";
      setTimeout(processLines, delaySystemLine);
    } else if (line.type === "prompt") {
      typeCommand(line.path, line.command, processLines);
    } else if (line.type === "progress") {
      showProgressBar(processLines);
    }
  }
  
  window.onload = () => {
    setTimeout(processLines, 1000); // petit délai avant démarrage
  };
  