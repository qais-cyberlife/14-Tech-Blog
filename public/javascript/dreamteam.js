async function newDreamTeam(event) {
    event.preventDefault();
    const GK = document.querySelector('#Gk').value;
    const RB = document.querySelector('#Rb').value;
    const CB1 = document.querySelector('#Cb1').value;
    const CB2 = document.querySelector('#Cb2').value;
    const LB = document.querySelector('#Lb').value;
    const RW = document.querySelector('#Rw').value;
    const CM1 = document.querySelector('#Cm1').value;
    const CM2 = document.querySelector('#Cm2').value;
    const LW = document.querySelector('#Lw').value;
    const ST1 = document.querySelector('#St1').value;
    const ST2 = document.querySelector('#St2').value;


    const response = await fetch(`/dreamteam`, {
      method: 'POST',
      body: JSON.stringify({
        Gk: GK,
        Rb: RB,
        Cb1: CB1,
        Cb2: CB2,
        Lb: LB,
        Rw: RW,
        Cm1: CM1,
        Cm2: CM2,
        Lw: LW,
        St1: ST1,
        St2: ST2,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //if the comment is added, the 'homepage' template will be rerendered
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add DreamTeam');
    }
  }
  
  document.querySelector('#dreamteam-form').addEventListener('submit', newDreamTeam);