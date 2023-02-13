<script>
    export let Problems;

    import Problem from "./Problem.svelte";
    
</script>

<div class = "m-4">
    <b>
        Note that the problems are suggested based on your rating.
    </b>
</div>

<div class = 'mt-4 mb-4'>
    {#each Problems as problem, i}
        <Problem Problem={problem} index={i}/>
    {/each}
</div>