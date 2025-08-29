// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  mobileMenu.style.height = mobileMenu.classList.contains('active')
    ? mobileMenu.scrollHeight + 'px' // Ajusta a altura para o conteúdo
    : '0';
});

// Close menu when clicking outside
document.addEventListener('click', e => {
  if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('active');
    mobileMenu.style.height = '0';
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      // Close mobile menu after clicking a link
      mobileMenu.classList.remove('active');
      mobileMenu.style.height = '0';
    }
  });
});

// Handle form submission for WhatsApp
const agendamentoForm = document.getElementById('agendamentoForm');
if (agendamentoForm) {
  agendamentoForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const mensagem = document.getElementById('mensagem').value;

    // Basic validation
    if (!nome || !telefone || !servico || !data) {
      alert(
        'Por favor, preencha todos os campos obrigatórios (Nome, Telefone, Serviço, Data).'
      );
      return;
    }

    // Format message for WhatsApp
    let whatsappMessage = `Olá! Gostaria de agendar um horário para extensão de cílios.
Nome: ${nome}
Telefone: ${telefone}
Email: ${email || 'Não informado'}
Serviço Desejado: ${servico}
Data Preferida: ${data}`;

    if (mensagem) {
      whatsappMessage += `\nObservações: ${mensagem}`;
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = '5511975396464'; // Replace with your actual WhatsApp number

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Optional: Clear form after submission
    agendamentoForm.reset();
    alert(
      'Sua solicitação de agendamento foi enviada para o WhatsApp! Por favor, finalize o agendamento por lá.'
    );
  });
}

// Add event listeners to form inputs for immediate feedback
document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('focus', function () {
    console.log(`Campo "${this.id}" focado.`);
    // You can add visual feedback here, e.g., change border color
    this.style.borderColor = '#ff9aa2';
  });

  input.addEventListener('blur', function () {
    console.log(`Campo "${this.id}" desfocado.`);
    // Reset visual feedback
    this.style.borderColor = '#e5e7eb';
  });

  input.addEventListener('input', function () {
    console.log(`Valor do campo "${this.id}" alterado para: ${this.value}`);
    // You can add real-time validation here
  });
});

// --- MODIFICAÇÃO AQUI: Preencher serviço e rolar para o formulário ---
document.querySelectorAll('.service-card .btn-primary').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do link

    const serviceName =
      this.closest('.service-card').querySelector('h3').textContent;
    const serviceSelect = document.getElementById('servico');
    const contatoSection = document.getElementById('contato');

    if (serviceSelect && contatoSection) {
      // Preenche o campo de serviço no formulário
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value === serviceName) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }

      // Rola suavemente para a seção de contato
      contatoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Opcional: Focar no primeiro campo vazio do formulário para facilitar o preenchimento
      setTimeout(() => {
        const nomeInput = document.getElementById('nome');
        if (nomeInput) {
          nomeInput.focus();
        }
      }, 500); // Pequeno atraso para garantir que a rolagem terminou
    }
  });
});
