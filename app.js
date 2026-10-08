const profiles = {
  iniciante: {
    title: "Vamos começar?",
    copy: "Encontre o que você precisa, sem complicação.",
    action: "Ver primeiros passos",
    guideTitle: "Seu primeiro acesso",
    steps: ["Escolha o perfil que combina com você.", "Explore os recursos principais.", "Ajuste sua experiência quando quiser."],
    note: "Explicações claras. Só o essencial para começar.",
    announcement: "Perfil Iniciante selecionado.",
  },
  avancado: {
    title: "Seu painel de controle",
    copy: "Acesse dados, atalhos e ferramentas em um só lugar.",
    action: "Abrir painel avançado",
    guideTitle: "Explore seu painel",
    steps: ["Acesse dados e recursos em um só lugar.", "Use atalhos para agilizar suas tarefas.", "Organize as ferramentas conforme seu fluxo."],
    note: "Mais recursos, informações e atalhos à mão.",
    announcement: "Perfil Avançado selecionado.",
  },
  acessibilidade: {
    title: "Tudo mais visível.",
    copy: "Texto ampliado e contraste reforçado para uma leitura confortável.",
    action: "Continuar com conforto",
    guideTitle: "Ajuste sua experiência",
    steps: ["Escolha o tamanho de texto mais confortável.", "Ative contraste reforçado para facilitar a leitura.", "Navegue com controles claros e fáceis de encontrar."],
    note: "Texto maior. Contraste alto. Alvos fáceis de selecionar.",
    announcement: "Perfil Acessibilidade selecionado.",
  },
  mobile: {
    title: "Cabe na sua mão.",
    copy: "Uma experiência organizada para acompanhar você onde estiver.",
    action: "Explorar no celular",
    guideTitle: "Acesse pelo celular",
    steps: ["Encontre as principais opções em uma tela.", "Use controles preparados para toque.", "Continue navegando em diferentes tamanhos de tela."],
    note: "Conteúdo pensado para telas pequenas e para o toque.",
    announcement: "Perfil Mobile selecionado.",
  },
};

const demo = document.querySelector(".adaptive-demo");
const modeButtons = document.querySelectorAll("[data-mode-button]");
const previewTitle = document.querySelector("[data-preview-title]");
const previewCopy = document.querySelector("[data-preview-copy]");
const previewAction = document.querySelector("[data-preview-action]");
const previewActionLabel = document.querySelector("[data-preview-action-label]");
const previewSteps = document.querySelector("[data-preview-steps]");
const previewStepTexts = previewSteps?.querySelectorAll("[data-preview-step-text]") ?? [];
const previewDetails = document.querySelector("[data-preview-details]");
const demoNote = document.querySelector("[data-demo-note]");
const modeAnnouncement = document.querySelector("[data-mode-announcement]");

const getCurrentProfile = () => profiles[demo?.dataset.mode] ?? profiles.iniciante;

const applyMode = (button) => {
  const mode = button.dataset.modeButton;
  const profile = profiles[mode] ?? profiles.iniciante;

  if (!demo) return;

  demo.dataset.mode = mode;
  previewTitle.textContent = profile.title;
  previewCopy.textContent = profile.copy;
  previewCopy.hidden = false;
  previewAction.setAttribute("aria-expanded", "false");
  previewActionLabel.textContent = profile.action;
  previewSteps.hidden = true;
  previewStepTexts.forEach((step, index) => {
    step.textContent = profile.steps[index];
  });
  demoNote.textContent = profile.note;
  modeAnnouncement.textContent = profile.announcement;
  previewDetails.hidden = mode !== "avancado";

  modeButtons.forEach((modeButton) => {
    const isActive = modeButton === button;
    modeButton.classList.toggle("is-active", isActive);
    modeButton.setAttribute("aria-pressed", String(isActive));
  });
};

const accessibilityStorageKey = "grand-modern-tech-accessibility";
const themeToggle = document.querySelector("#theme-toggle");
const contrastToggle = document.querySelector("#contrast-toggle");
const colorVisionToggle = document.querySelector("#color-vision-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
let savedAccessibility = {};

try {
  savedAccessibility = JSON.parse(localStorage.getItem(accessibilityStorageKey) || "{}");
} catch {
  savedAccessibility = {};
}

const accessibilitySettings = {
  theme: savedAccessibility.theme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  highContrast: Boolean(savedAccessibility.highContrast),
  colorVision: Boolean(savedAccessibility.colorVision),
};

const applyAccessibilitySettings = () => {
  document.documentElement.dataset.theme = accessibilitySettings.theme;
  document.documentElement.dataset.contrast = accessibilitySettings.highContrast ? "high" : "normal";
  document.documentElement.dataset.colorVision = accessibilitySettings.colorVision ? "safe" : "standard";
  themeToggle.checked = accessibilitySettings.theme === "dark";
  contrastToggle.checked = accessibilitySettings.highContrast;
  colorVisionToggle.checked = accessibilitySettings.colorVision;
  themeColor.content = accessibilitySettings.theme === "dark" ? "#151b18" : "#f3f4ee";

  try {
    localStorage.setItem(accessibilityStorageKey, JSON.stringify(accessibilitySettings));
  } catch {}
};

themeToggle.addEventListener("change", () => {
  accessibilitySettings.theme = themeToggle.checked ? "dark" : "light";
  applyAccessibilitySettings();
});

contrastToggle.addEventListener("change", () => {
  accessibilitySettings.highContrast = contrastToggle.checked;
  applyAccessibilitySettings();
});

colorVisionToggle.addEventListener("change", () => {
  accessibilitySettings.colorVision = colorVisionToggle.checked;
  applyAccessibilitySettings();
});

applyAccessibilitySettings();

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyMode(button);
  });
});

const initialModeButton = document.querySelector('[data-mode-button="iniciante"]');
if (initialModeButton) {
  applyMode(initialModeButton);
}

previewAction?.addEventListener("click", () => {
  const profile = getCurrentProfile();
  const isExpanded = previewAction.getAttribute("aria-expanded") !== "true";

  previewAction.setAttribute("aria-expanded", String(isExpanded));
  previewActionLabel.textContent = isExpanded ? "Voltar ao resumo" : profile.action;
  previewTitle.textContent = isExpanded ? profile.guideTitle : profile.title;
  previewCopy.hidden = isExpanded;
  previewSteps.hidden = !isExpanded;
});

const valueDetails = {
  simples: {
    title: "Uma navegação mais simples",
    copy: "O modo Iniciante reduz o excesso de opções e apresenta orientações claras. Assim, cada pessoa encontra o próximo passo sem precisar conhecer o sistema por dentro.",
  },
  acessivel: {
    title: "Acessibilidade pensada desde o início",
    copy: "Contraste reforçado, textos ajustáveis e controles fáceis de identificar ajudam pessoas com diferentes necessidades a navegar com mais autonomia.",
  },
  rapido: {
    title: "Menos etapas para chegar ao que importa",
    copy: "Caminhos diretos e atalhos deixam as tarefas frequentes mais fáceis de encontrar, reduzindo o tempo entre a intenção e a ação.",
  },
  pessoal: {
    title: "Uma experiência com o seu jeito",
    copy: "Preferências e familiaridade com a tecnologia orientam uma interface mais alinhada à forma como cada pessoa gosta de usar os serviços digitais.",
  },
};

const valueButtons = document.querySelectorAll("[data-value-button]");
const valueDetail = document.querySelector("#value-detail");
const valueTitle = document.querySelector("[data-value-title]");
const valueCopy = document.querySelector("[data-value-copy]");

valueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isOpening = button.getAttribute("aria-expanded") !== "true";

    valueButtons.forEach((valueButton) => {
      const isActive = valueButton === button && isOpening;
      valueButton.setAttribute("aria-expanded", String(isActive));
      valueButton.classList.toggle("is-active", isActive);
    });

    valueDetail.hidden = !isOpening;

    if (isOpening) {
      const detail = valueDetails[button.dataset.valueButton];
      valueTitle.textContent = detail.title;
      valueCopy.textContent = detail.copy;
    }
  });
});

const memberToggles = document.querySelectorAll(".member-toggle");

memberToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const isOpening = button.getAttribute("aria-expanded") !== "true";

    memberToggles.forEach((memberToggle) => {
      const isExpanded = memberToggle === button && isOpening;
      const details = document.getElementById(memberToggle.getAttribute("aria-controls"));
      const name = memberToggle.getAttribute("aria-label").replace("Ver mais sobre ", "").replace("Ocultar detalhes de ", "");

      memberToggle.setAttribute("aria-expanded", String(isExpanded));
      memberToggle.setAttribute("aria-label", `${isExpanded ? "Ocultar detalhes de" : "Ver mais sobre"} ${name}`);
      memberToggle.closest(".team-member").classList.toggle("is-open", isExpanded);
      details.hidden = !isExpanded;
    });
  });
});

const supportForm = document.querySelector("#support-form");
const contactChoiceToggle = document.querySelector(".contact-choice-toggle");
const contactMethods = document.querySelector("#contact-methods");

contactChoiceToggle?.addEventListener("click", () => {
  const isHidden = contactMethods.hasAttribute("hidden");

  contactMethods.toggleAttribute("hidden", !isHidden);
  contactChoiceToggle.setAttribute("aria-expanded", String(isHidden));
  contactChoiceToggle.textContent = isHidden ? "Ocultar opções" : "Falar com a equipe";
});

supportForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(supportForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const whatsappText = [
    "Olá, Grand Modern Tech!",
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Assunto: ${subject}`,
    "",
    `Mensagem: ${message}`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/5562985859835?text=${encodeURIComponent(whatsappText)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  supportForm.reset();
});