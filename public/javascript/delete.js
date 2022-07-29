async function deleteDreamTeam(event) {
    event.preventDefault();
    const deleteId = event.target.id
    const response = await fetch(`/dreamteam/${deleteId}`, {
        method: 'DELETE'
    });
        if (response.ok) {
        document.location.replace('/dreamteam')
        } else {
        alert('delete failed');
        }
}

const deleteButton = document.querySelectorAll('.deleteButton');
deleteButton.forEach(button =>{
    button.addEventListener('click', deleteDreamTeam)
});