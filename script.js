function showSection(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* Motivational Quotes Carousel */
const quotes = [
  "Your mental health matters!",
  "Take small steps every day.",
  "It's okay to ask for help.",
  "Breathe, relax, repeat."
];
let quoteIndex = 0;
function showQuote(){
  const carousel = document.getElementById('quoteCarousel');
  carousel.innerText = quotes[quoteIndex];
  quoteIndex = (quoteIndex+1)%quotes.length;
}
setInterval(showQuote, 4000);
showQuote();

/* Chatbot with multiple responses */
const responses = {
  stress: ["Take a deep breath 🌬️", "Try a 5-min meditation", "Listen to relaxing music 🎵"],
  sleep: ["Avoid screens 30 min before bed", "Try reading a book 📖", "Maintain a sleep schedule 🕗"],
  motivation: ["Keep going! 💪", "Believe in yourself 🌟", "Small steps lead to big changes"],
  anxiety: ["Ground yourself with 5 senses", "Talk to someone you trust", "Focus on your breathing"]
};

function sendChat(){
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');
  if(!input.value.trim()) return;
  const userMsg = document.createElement('p');
  userMsg.innerHTML = `<strong>You:</strong> ${input.value}`;
  userMsg.style.alignSelf = 'flex-end';
  userMsg.style.background = '#A7C7E7';
  chatBox.appendChild(userMsg);

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(()=>{
    typing.remove();
    const botMsg = document.createElement('p');
    let found=false;
    for(const key in responses){
      if(input.value.toLowerCase().includes(key)){
        const r = responses[key];
        botMsg.innerHTML = `<strong>Bot:</strong> ${r[Math.floor(Math.random()*r.length)]}`;
        found=true;
        break;
      }
    }
    if(!found){
      botMsg.innerHTML = `<strong>Bot:</strong> I hear you! 🙏`;
    }
    botMsg.style.alignSelf='flex-start';
    botMsg.style.background='#4A4E69';
    chatBox.appendChild(botMsg);
    chatBox.scrollTop=chatBox.scrollHeight;
  },1000);
  input.value='';
}

/* Booking */
function submitBooking(){
  const name=document.getElementById('name').value;
  const date=document.getElementById('date').value;
  const time=document.getElementById('time').value;
  if(!name || !date || !time) return alert('Fill all fields');
  document.getElementById('bookingList').innerHTML+=`<div class="card">${name} - ${date} ${time}</div>`;
  document.getElementById('name').value=''; document.getElementById('date').value=''; document.getElementById('time').value='';
}

/* Peer Support */
function submitPeer(){
  const input=document.getElementById('peerInput').value;
  if(!input.trim()) return;
  document.getElementById('peerList').innerHTML+=`<div class="card">${input}</div>`;
  document.getElementById('peerInput').value='';
}

/* Resources Tabs */
const resourcesData = {
  meditation:[{title:"Meditation Video",desc:"10-min guided"}],
  stress:[{title:"Stress Relief Audio",desc:"Relaxing music"}],
  mindfulness:[{title:"Mindfulness PDF",desc:"Daily practice guide"}]
};
function showResourceTab(tab){
  const container=document.getElementById('resourcesContent');
  container.innerHTML='';
  resourcesData[tab].forEach(r=>{
    container.innerHTML+=`<div class="card"><strong>${r.title}</strong><p>${r.desc}</p></div>`;
  });
}

/* Admin Dashboard */
window.onload = ()=>{
  showResourceTab('meditation'); // Default
  const ctx=document.getElementById('adminChart').getContext('2d');
  new Chart(ctx,{
    type:'bar',
    data:{
      labels:['Bookings','Peer Posts','Resources Viewed'],
      datasets:[{label:'Activity',data:[5,4,7],backgroundColor:['#A7C7E7','#4A4E69','#EDEDED']}]
    },
    options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}
  });
};
