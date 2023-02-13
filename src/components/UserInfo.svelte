<script>

  import { Modal, Button } from 'flowbite-svelte'

  export let User;

  let ModalState = false;
</script>

<div class = "text-slate-700 mt-4">
  <Button size='md' pill outline gradient color="tealToLime" on:click={() => ModalState = true}>Profile</Button>
</div>
<Modal title="User Information" bind:open={ModalState} autoclose>
  <div>
    <b>Name </b>
    {User.firstName} {User.lastName}
    <br/>
    <b>Rating</b>
    {User.rating}
    <br/>
    <b>Friends of </b>
    {User.friendOfCount} members
  </div>
</Modal>