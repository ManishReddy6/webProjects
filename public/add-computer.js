var modal=document.getElementById('modal');
var cancelbtn=document.getElementById('cancel');
var addbtn=document.getElementById('addbtn');
var start=document.getElementById('start');

addbtn.addEventListener('click',openModal);
cancelbtn.addEventListener('click',closeModal);


function currentTime()
{
	document.getElementById('logout').value = newDate();
}
function openModal() 
{
	modal.style.display='block';
}
function closeModal() 
{
   	modal.style.display='none';
}