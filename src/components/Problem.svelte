<script>
    export let Problem;
    export let index;
    import { Card } from "flowbite-svelte";
</script>

<Card class = "m-4 float-left" margin color="dark" rounded="true" border="true" shadow target="_blank" href={"http://codeforces.com/problemset/problem/" + Problem.contestId + "/" + Problem.index}>
    <p class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{index + 1}. {Problem.name}</p>

    <p class = "float-right">Rating: {Problem.rating}</p>
    
</Card>