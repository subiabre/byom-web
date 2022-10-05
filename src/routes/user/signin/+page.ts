import type { ServerLoadEvent } from "@sveltejs/kit";

export function load({ url }: ServerLoadEvent)
{
    return {
        token: url.searchParams.getAll('token')[0]
    };
}
