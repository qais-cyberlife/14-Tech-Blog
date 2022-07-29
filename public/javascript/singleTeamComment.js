async function newTeamComment(event) {
    event.preventDefault();
    const commentText = document.querySelector('#commentText').value;
    const URITeam = document.location.pathname.split('/')

    const response = await fetch(`/singlecomment`, {
      method: 'POST',
      body: JSON.stringify({
        comment_text: commentText,
        teams_id: URITeam[2],
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
  
  document.querySelector('#commentBar').addEventListener('submit', newTeamComment);