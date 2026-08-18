// =============================================
// KAI NEXUS
// =============================================
const network = document.getElementById("network");
// =============================================
// KAI NEXUS CONNECTIONS
// =============================================
const connectionLayer = document.getElementById("connectionLayer");
const particleLayer = document.getElementById("particleLayer");
// =============================================
// CREATE PLATFORM NODES
// =============================================
platforms.forEach((platform, index) => {
  const node = document.createElement("div");
  node.className = "platform-node";
  node.dataset.index = index;
  node.dataset.platform = platform.name;
  node.innerHTML = `
    <img src="${platform.icon}" alt="${platform.name}">
    <div class="platform-node-name">
      ${platform.name}
    </div>
    <div class="platform-node-type">
      ${platform.type}
    </div>`;
  network.appendChild(node);
});
// =============================================
// DYNAMIC PLATFORM LAYOUT
// =============================================
function positionPlatforms() {
  const nodes = document.querySelectorAll(".platform-node");
  if (!nodes.length) {
    return;
  }
  // Maximum platforms allowed in one ring
  const maxPerRing = 8;
  // Automatically determine number of rings
  const ringCount = Math.ceil(nodes.length / maxPerRing);
  const cardWidth = 145;
  const cardHeight = 100;
  const halfWidth = cardWidth / 2;
  const halfHeight = cardHeight / 2;
  // Space from network boundary
  const sideMargin = 40;
  // Distance between rings
  const ringGap = 175;
  // Distance from KAI center
  const safeRadius = 210;
  // =============================================
  // BALANCED RING DISTRIBUTION
  // =============================================
  /*
     Example:
     6 nodes  → 6
     10 nodes → 5 + 5
     15 nodes → 8 + 7
     20 nodes → 7 + 7 + 6
     24 nodes → 8 + 8 + 8
     This prevents the last ring from looking
     almost empty.
  */
  const basePerRing = Math.floor(nodes.length / ringCount);
  const extraNodes = nodes.length % ringCount;
  const ringSizes = [];
  for (let i = 0; i < ringCount; i++) {
    ringSizes.push(basePerRing + (i < extraNodes ? 1 : 0));
  }
  // =============================================
  // CALCULATE OUTERMOST RING
  // =============================================
  const outerRadius = safeRadius + (ringCount - 1) * ringGap;
  // =============================================
  // AUTOMATIC NETWORK HEIGHT
  // =============================================
  const requiredHeight = Math.max(700, outerRadius * 2 + cardHeight + sideMargin * 2);
  network.style.height = `${requiredHeight}px`;
  // =============================================
  // NETWORK DIMENSIONS
  // =============================================
  const networkWidth = network.clientWidth;
  const networkHeight = network.clientHeight;
  const centerX = networkWidth / 2;
  const centerY = networkHeight / 2;
  // =============================================
  // POSITION RINGS
  // =============================================
  let nodeIndex = 0;
  for (let ring = 0; ring < ringCount; ring++) {
    const nodesInRing = ringSizes[ring];
    const radius = safeRadius + ring * ringGap;
    /*
       Rotate alternate rings slightly.
       This prevents cards from stacking
       directly behind each other when
       multiple rings exist.
    */
    const ringOffset = ring % 2 === 0 ? 0 : Math.PI / nodesInRing;
    // ===========================================
    // POSITION NODES IN CURRENT RING
    // ===========================================
    for (let positionInRing = 0; positionInRing < nodesInRing; positionInRing++) {
      const node = nodes[nodeIndex];
      const angle = (positionInRing / nodesInRing) * Math.PI * 2 - Math.PI / 2 + ringOffset;
      // =========================================
      // CALCULATE POSITION
      // =========================================
      let x = centerX + Math.cos(angle) * radius;
      let y = centerY + Math.sin(angle) * radius;
      // =========================================
      // KEEP CARDS INSIDE NETWORK
      // =========================================
      const minX = halfWidth + sideMargin;
      const maxX = networkWidth - halfWidth - sideMargin;
      const minY = halfHeight + sideMargin;
      const maxY = networkHeight - halfHeight - sideMargin;
      x = Math.max(minX, Math.min(maxX, x));
      y = Math.max(minY, Math.min(maxY, y));
      // =========================================
      // APPLY POSITION
      // =========================================
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      node.style.transform = "translate(-50%, -50%)";
      nodeIndex++;
    }
  }
}
// =============================================
// DRAW NETWORK CONNECTIONS
// =============================================
function drawConnections() {
  if (!connectionLayer || !network) {
    return;
  }
  connectionLayer.innerHTML = "";
  const networkRect = network.getBoundingClientRect();
  const layerRect = connectionLayer.getBoundingClientRect();
  if (!networkRect.width || !networkRect.height || !layerRect.width || !layerRect.height) {
    return;
  }
  // Convert network coordinates into the actual SVG coordinates.
  // This keeps the lines correct even if the SVG and network have
  // slightly different rendered dimensions.
  const scaleX = layerRect.width / networkRect.width;
  const scaleY = layerRect.height / networkRect.height;
  const centerNode = document.querySelector(".center-node");
  if (!centerNode) {
    return;
  }
  const centerRect = centerNode.getBoundingClientRect();
  const centerX = (centerRect.left - networkRect.left + centerRect.width / 2) * scaleX;
  const centerY = (centerRect.top - networkRect.top + centerRect.height / 2) * scaleY;
  const nodes = document.querySelectorAll(".platform-node");
  nodes.forEach((node) => {
    const rect = node.getBoundingClientRect();
    // Exact center of each platform card.
    const nodeX = (rect.left - networkRect.left + rect.width / 2) * scaleX;
    const nodeY = (rect.top - networkRect.top + rect.height / 2) * scaleY;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", centerX);
    line.setAttribute("y1", centerY);
    line.setAttribute("x2", nodeX);
    line.setAttribute("y2", nodeY);
    line.classList.add("network-line");
    connectionLayer.appendChild(line);
  });
}
// =============================================
// DATA PARTICLES
// =============================================
function createParticles() {
  if (!particleLayer) {
    return;
  }
  particleLayer.innerHTML = "";
  const layerRect = particleLayer.getBoundingClientRect();
  const centerNode = document.querySelector(".center-node");
  if (!centerNode) {
    return;
  }
  const centerRect = centerNode.getBoundingClientRect();
  const centerX = centerRect.left - layerRect.left + centerRect.width / 2;
  const centerY = centerRect.top - layerRect.top + centerRect.height / 2;
  const nodes = document.querySelectorAll(".platform-node");
  nodes.forEach((node, index) => {
    const rect = node.getBoundingClientRect();
    const nodeX = rect.left - layerRect.left + rect.width / 2;
    const nodeY = rect.top - layerRect.top + rect.height / 2;
    const particle = document.createElement("div");
    particle.className = "data-particle";
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.setProperty("--start-x", `${centerX}px`);
    particle.style.setProperty("--start-y", `${centerY}px`);
    particle.style.setProperty("--target-x", `${nodeX - centerX}px`);
    particle.style.setProperty("--target-y", `${nodeY - centerY}px`);
    particle.style.animationDelay = `${index * 0.35}s`;
    particleLayer.appendChild(particle);
  });
}
// =============================================
// INITIAL NETWORK DRAW
// =============================================
function refreshNetwork() {
  positionPlatforms();
  // The platform positions are applied by CSS/layout asynchronously.
  // Draw again after layout settles so every line uses the final
  // center of KAI and the final center of every platform card.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      drawConnections();
      createParticles();
      // Extra sync passes handle browser repaint, font/image layout,
      // and any CSS positioning transition after a refresh/resize.
      setTimeout(() => {
        drawConnections();
        createParticles();
      }, 100);
      setTimeout(() => {
        drawConnections();
        createParticles();
      }, 250);
      setTimeout(() => {
        drawConnections();
        createParticles();
      }, 500);
    });
  });
}
// =============================================
// WAIT FOR PAGE + IMAGES + FONTS
// =============================================
function initializeNetwork() {
  const images = document.querySelectorAll(".platform-node img");
  let imagesRemaining = 0;
  images.forEach((img) => {
    if (!img.complete) {
      imagesRemaining++;
      img.addEventListener(
        "load",
        () => {
          imagesRemaining--;
          if (imagesRemaining === 0) {
            refreshNetwork();
          }
        },
        { once: true },
      );
      img.addEventListener(
        "error",
        () => {
          imagesRemaining--;
          if (imagesRemaining === 0) {
            refreshNetwork();
          }
        },
        { once: true },
      );
    }
  });
  // If all images are already loaded.
  if (imagesRemaining === 0) {
    refreshNetwork();
  }
  // Wait for fonts as well.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      refreshNetwork();
    });
  }
}
// =============================================
// START NETWORK
// =============================================
if (document.readyState === "complete") {
  initializeNetwork();
} else {
  window.addEventListener("load", initializeNetwork, {
    once: true,
  });
}
// =============================================
// RESIZE
// =============================================
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    refreshNetwork();
  }, 100);
});
// =============================================
// PLATFORM INTELLIGENCE
// =============================================
const emptyState = document.getElementById("emptyState");
const profileState = document.getElementById("profileState");
const profileIcon = document.getElementById("profileIcon");
const profileName = document.getElementById("profileName");
const profileType = document.getElementById("profileType");
const profileDescription = document.getElementById("profileDescription");
const profileStats = document.getElementById("profileStats");
const openButton = document.getElementById("openButton");
// =============================================
// ACTIVATE PLATFORM
// =============================================
let activePlatform = null;
function activatePlatform(index) {
  const platform = platforms[index];
  if (!platform) {
    return;
  }
  // Store the currently selected platform
  activePlatform = platform;
  // Verify connection
  updateConnectionStatus(platform);
  const connection = getConnectionStatus(platform.url);
  // -----------------------------------------
  // PANEL
  // -----------------------------------------
  emptyState.hidden = true;
  profileState.hidden = false;
  // -----------------------------------------
  // CONTENT
  // -----------------------------------------
  profileIcon.src = platform.icon;
  profileIcon.alt = platform.name;
  profileName.textContent = platform.name;
  profileType.textContent = platform.type;
  profileDescription.textContent = platform.description;
  profileStats.textContent = platform.stats;
  // -----------------------------------------
  // ACTIVE NODE
  // -----------------------------------------
  document
    .querySelectorAll(".platform-node")
    .forEach((node) => node.classList.remove("active"));
  const nodes = document.querySelectorAll(".platform-node");
  if (nodes[index]) {
    nodes[index].classList.add("active");
  }
  // -----------------------------------------
  // OPEN PLATFORM
  // -----------------------------------------
  openButton.onclick = () => {
    if (!activePlatform) {
      showConnectionMessage("NO PLATFORM SELECTED");
      return;
    }
    const connection = getConnectionStatus(activePlatform.url);
    if (connection.state === "missing") {
      showConnectionMessage("CONNECTION MISSING");
      return;
    }
    if (connection.state === "invalid") {
      showConnectionMessage("CONNECTION INVALID");
      return;
    }
    if (connection.state === "offline") {
      showConnectionMessage("NETWORK OFFLINE");
      return;
    }
    window.open(activePlatform.url, "_blank", "noopener,noreferrer");
  };
  // -----------------------------------------
  // CONNECTION MESSAGE
  // -----------------------------------------
  function showConnectionMessage(message) {
    const statusElement = document.getElementById("profileStatus");
    if (!statusElement) {
      return;
    }
    statusElement.textContent = `⚠ ${message}`;
    statusElement.className = "profile-status invalid";
    setTimeout(() => {
      if (!activePlatform) {
        return;
      }
      const connection = getConnectionStatus(activePlatform.url);
      statusElement.textContent = `● ${connection.text}`;
      statusElement.className = `profile-status ${connection.state}`;
    }, 2500);
  }
}
document.querySelectorAll(".platform-node").forEach((node, index) => {
  node.addEventListener("click", () => {
    activatePlatform(index);
  });
});
document.querySelectorAll(".platform-node").forEach((node) => {
  node.addEventListener("mouseenter", () => {
    node.classList.add("scanning");
  });
  node.addEventListener("mouseleave", () => {
    node.classList.remove("scanning");
  });
});
// =============================================
// CONNECTION STATUS
// =============================================
function getConnectionStatus(url) {
  // No URL
  if (!url || url.trim() === "") {
    return {
      state: "missing",
      text: "CONNECTION MISSING",
    };
  }
  // Placeholder URL
  if (url.startsWith("YOUR_") || url.includes("YOUR_LINK")) {
    return {
      state: "missing",
      text: "CONNECTION MISSING",
    };
  }
  // Browser offline
  if (!navigator.onLine) {
    return {
      state: "offline",
      text: "NETWORK OFFLINE",
    };
  }
  // Check URL structure
  try {
    const parsed = new URL(url);
    // Only HTTP/HTTPS allowed
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return {
        state: "invalid",
        text: "CONNECTION INVALID",
      };
    }
    // URL must have a hostname
    if (!parsed.hostname) {
      return {
        state: "invalid",
        text: "CONNECTION INVALID",
      };
    }
    return {
      state: "verified",
      text: "LINK VERIFIED",
    };
  } catch {
    return {
      state: "invalid",
      text: "CONNECTION INVALID",
    };
  }
}
function updateConnectionStatus(platform) {
  const statusElement = document.getElementById("profileStatus");
  if (!statusElement) {
    return;
  }
  // Show checking state first
  statusElement.textContent = "◌ VERIFYING LINK...";
  statusElement.className = "profile-status checking";
  // Small KAI scanning delay
  setTimeout(() => {
    const connection = getConnectionStatus(platform.url);
    statusElement.textContent =
      connection.state === "verified"
        ? "● LINK VERIFIED"
        : connection.state === "missing"
          ? "○ CONNECTION MISSING"
          : connection.state === "offline"
            ? "⚠ NETWORK OFFLINE"
            : "⚠ CONNECTION INVALID";
    statusElement.className = `profile-status ${connection.state}`;
  }, 500);
}
window.addEventListener("online", () => {
  if (activePlatform) {
    updateConnectionStatus(activePlatform);
  }
});
window.addEventListener("offline", () => {
  if (!activePlatform) {
    return;
  }
  const statusElement = document.getElementById("profileStatus");
  if (!statusElement) {
    return;
  }
  statusElement.textContent = "⚠ NETWORK OFFLINE";
  statusElement.className = "profile-status offline";
});
// =========================================
// LIVE YEAR
// =========================================
function updateYear() {
  const year = document.getElementById("currentYear");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}
updateYear();
// =============================================
// WEBSITE VIEW COUNTER — SUPABASE
// =============================================
const SUPABASE_URL = "https://cgkmhektkauaxigmqspk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_sOL-CyHF7dMZ-xpq4CBf9Q_hhgsY-wu";
async function updateViewCounter() {
  const viewCountElement = document.getElementById("viewCount");
  const tooltipElement = document.getElementById("viewTooltip");
  if (!viewCountElement) {
    return;
  }
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/increment-view`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_PUBLISHABLE_KEY
        },
        body: JSON.stringify({})
      }
    );
    const data = await response.json();
    console.log("Supabase response:", data);
    if (response.ok && data.success) {
      viewCountElement.textContent = data.views;
      if (tooltipElement) {
        tooltipElement.textContent =
          data.views === 1
            ? "1 VIEW"
            : `${data.views} VIEWS`;
      }
    } else {
      console.error("View counter failed:", data);
    }
  } catch (error) {
    console.error("View counter error:", error);
  }
}
updateViewCounter();