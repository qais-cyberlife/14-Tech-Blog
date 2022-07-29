async function newComment(event) {
    event.preventDefault();
    
    const commentText = document.querySelector('#commentText').value;
    const rawTeam = document.querySelector('#commentTeam').value;
    const teamSplit = rawTeam.split(' ')
    const team = teamSplit[0];

    const response = await fetch(`/comment`, {
      method: 'POST',
      body: JSON.stringify({
        comment_text: commentText,
        teams_id: team,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //if the comment is added, the 'homepage' template will be rerendered
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to add comment');
    }
  }
  
  document.querySelector('#commentBar').addEventListener('submit', newComment);