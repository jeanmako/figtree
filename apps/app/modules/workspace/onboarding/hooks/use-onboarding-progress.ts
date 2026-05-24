import { setOnboardingProgress } from "@/modules/workspace/onboarding/lib/set-onboarding-step"
import { OnboardingStep } from "@/modules/workspace/onboarding/lib/types"
import { useWorkspaceQuery } from "@/modules/workspace/hooks/workspace-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { toastManager } from "@figtree/ui/components/toast"

const PRE_WORKSPACE_STEPS = ["workspace"]

export function useOnboardingProgress() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { slug: workspaceSlug } = useWorkspaceQuery()
  const slug = workspaceSlug || searchParams.get("workspace")

  const mutation = useMutation({
    mutationFn: async (step: OnboardingStep) =>
      setOnboardingProgress({ onboardingStep: step }),
    onSuccess: () => {
      console.log("Onboarding progress updated")
    },
    onError: (error: Error) => {
      toastManager.add({
        title: "Failed to update onboarding progress. Please try again.",
        type: "error",
      })
      console.error("Failed to update onboarding progress", error)
    },
  })

  const continueTo = useCallback(
    async (
      step: OnboardingStep,
      {
        slug: providedSlug,
        params,
      }: { slug?: string; params?: Record<string, string> } = {}
    ) => {
      try {
        await mutation.mutateAsync(step)

        const queryParams = new URLSearchParams(params || undefined)

        if (!PRE_WORKSPACE_STEPS.includes(step)) {
          queryParams.set("workspace", String(providedSlug || slug))
        }

        router.push(`/onboarding/${step}?${queryParams}`)
      } catch (error) {
        console.error("Failed to continue onboarding", error)
      }
    },
    [mutation, router, slug]
  )

  const finish = useCallback(async () => {
    await mutation.mutateAsync("completed")

    router.push(slug ? `/${slug}` : "/")
  }, [mutation, router, slug])

  return {
    continueTo,
    finish,
    isLoading: mutation.isPending,
    isSuccessful: mutation.isSuccess,
  }
}
