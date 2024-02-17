"use server";

import React from "react";
import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import ViewEventPage from "@/components/event/ViewEventPage";
import { fetchEventData } from "@/utilities/fetch/event";
import { fetchUser } from "@/utilities/fetch/user";

const EventsPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const user = await fetchUser(supabase);

  await queryClient.prefetchQuery({
    queryKey: ["event"],
    queryFn: () => fetchEventData(user.accessToken, params.id),
  });

  await queryClient.prefetchQuery({
    queryKey: ["jwt"],
    queryFn: () => user.accessToken,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ViewEventPage id={params.id} />
    </HydrationBoundary>
  );
};

export default EventsPage;
