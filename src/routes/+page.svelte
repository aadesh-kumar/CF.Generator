<script lang="ts">
    import axios from "axios";

    import UserInfo from "../components/UserInfo.svelte";

    import {
        AddUserToFirestore,
        checkUserByHandle,
    } from "../controllers/User.js";

    import ProblemList from "../components/ProblemList.svelte";

    import { Button } from "flowbite-svelte";

    import toast, { Toaster } from "svelte-french-toast";

    import { db } from "../stores/db.js";

    let handle = "";
    let User;
    let Problems = [];

    async function GetUser() {
        return await axios.get(
            "https://codeforces.com/api/user.info?handles=" + handle
        );
    }

    const handleSubmit = async () => {
        User = null;
        Problems = [];
        const toastId = toast.loading("Retrieving " + handle);
        try {
            const response = await GetUser();
            toast.success("Success", { id: toastId });
            User = response.data.result[0];
            if (!(await checkUserByHandle(db, { handle: User.handle }))) {
                AddUserToFirestore(db, { handle: User.handle });
            }
        } catch (error) {
            toast.error(
                "Error retrieving " + handle + "\nPlease check the spelling",
                {
                    id: toastId,
                }
            );
        }
    };

    function GetProblems() {
        return axios
            .get("https://codeforces.com/api/problemset.problems")
            .then((response) => {
                return response.data.result.problems;
            })
            .catch((error) => {
                return "Could not retrieve problems";
            });
    }

    const startContest = async () => {
        if (!("rating" in User)) return;
        const toastId = toast.loading("Loading contest...");
        try {
            let problems = await GetProblems();
            const user_rating =
                User.rating % 100 > 50
                    ? Math.ceil(User.rating / 100) * 100
                    : Math.floor(User.rating / 100) * 100;
            const largest_rating = Math.max(
                ...problems.map((problem) => {
                    return "rating" in problem ? problem.rating : 0;
                })
            );
            const smallest_rating = Math.min(
                ...problems.map((problem) => {
                    return "rating" in problem ? problem.rating : 5000;
                })
            );
            let vis = [];
            for (let i = 0; i < 5; ++i) {
                let problemId = Math.floor(Math.random() * problems.length);

                let desired = user_rating - (2 - i) * 200;
                if (desired > largest_rating) desired = largest_rating;
                if (desired < smallest_rating) desired = smallest_rating;

                while (
                    problemId in vis ||
                    !("rating" in problems[problemId]) ||
                    problems[problemId].rating != desired
                )
                    problemId = Math.floor(Math.random() * problems.length);

                Problems[i] = problems[problemId];
            }
            toast.success("Successfully created", { id: toastId });
        } catch (error) {
            toast.error("Failed to create contest", { id: toastId });
            return error;
        }
    };

    const endContest = () => {
        Problems = [];
    };
</script>

<Toaster />

<div class="container mx-auto px-0 pt-10">
    <h3 class="flex justify-center pb-8 text-4xl font-bold text-red-600">
        Codeforces problem generator
    </h3>
    <form class="flex group relative">
        <input
            bind:value={handle}
            class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-md leading-6  text-slate-900 placeholder-slate-400 rounded-lg py-2 pl-4 ring-1 ring-slate-200 shadow-md bg-gray-100"
            type="text"
            aria-label="Enter handle"
            placeholder="Enter codeforces handle..."
        />

        <button
            on:click={handleSubmit}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-8 px-7 my-4 rounded-md"
        >
            Submit
        </button>
    </form>

    {#if User != null}
        <UserInfo {User} />
        <hr class="mb-4 mt-4" />
        {#if Problems.length == 0}
            <Button
                on:click={startContest}
                shadow="green"
                gradient
                color="green">Start Contest</Button
            >
        {:else}
            <Button on:click={endContest} shadow="red" gradient color="red"
                >End Contest</Button
            >
        {/if}
    {/if}

    {#if Problems.length > 0}
        <ProblemList {Problems} />
    {/if}
</div>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.300);
    }
</style>
