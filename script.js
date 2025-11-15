    window.addEventListener('load', ()=>{
      requestAnimationFrame(()=>{
        document.getElementById('htmlBar').style.width = '85%';
        document.getElementById('cssBar').style.width = '90%';
        document.getElementById('jsBar').style.width = '30%';
        document.getElementById('reactBar').style.width = '30%';
      });
      drawPulse();
    });
    function drawPulse(){
      const c = document.getElementById('pulseCanvas');
      c.width = c.clientWidth; c.height = c.clientHeight;
      const ctx = c.getContext('2d');
      let t = 0;
      function frame(){
        t += 0.02;
        ctx.clearRect(0,0,c.width,c.height);
        const grd = ctx.createRadialGradient(c.width*0.5, c.height*0.5, 10, c.width*0.5, c.height*0.5, c.width*0.9);
        grd.addColorStop(0, 'rgba(124,58,237,' + (0.35+Math.sin(t)*0.05) + ')');
        grd.addColorStop(1, 'rgba(6,182,212,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0,0,c.width,c.height);
        requestAnimationFrame(frame);
      }
      frame();
      window.addEventListener('resize', ()=>{c.width=c.clientWidth; c.height=c.clientHeight});
    }
    document.getElementById('downloadBtn').addEventListener('click', ()=>{
      const skills = Array.from(document.querySelectorAll('.skill')).map(x=>x.textContent);
      const profile = {
        name:document.getElementById('nameText').textContent,
        role:document.getElementById('roleText').textContent,
        bio:document.getElementById('bioText').textContent,
        skills
      };
      const blob = new Blob([JSON.stringify(profile, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); 
      a.href = url; 
      a.download = (profile.name||'profile') + '.json'; 
      document.body.appendChild(a); 
      a.click(); 
      a.remove();
    });