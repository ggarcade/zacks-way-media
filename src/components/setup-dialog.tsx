import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  INTEREST_OPTIONS,
  KNOWN_INSTAGRAM_HANDLE,
  type InterestId,
  useProfileStore,
} from "@/lib/profile-store";
import { cn } from "@/lib/utils";

type SetupDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "setup" | "edit";
};

export function SetupDialog({
  open,
  onOpenChange,
  mode = "edit",
}: SetupDialogProps) {
  const profile = useProfileStore();
  const [name, setName] = useState(profile.displayName);
  const [handle, setHandle] = useState(profile.handle);
  const [bio, setBio] = useState(profile.bio);
  const [interests, setInterests] = useState<InterestId[]>(profile.interests);

  useEffect(() => {
    if (!open) return;
    setName(profile.displayName);
    setHandle(profile.handle || KNOWN_INSTAGRAM_HANDLE);
    setBio(profile.bio);
    setInterests(profile.interests);
  }, [open, profile.displayName, profile.handle, profile.bio, profile.interests]);

  function toggleInterest(id: InterestId) {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function save() {
    profile.completeSetup({
      displayName: name,
      handle: handle || KNOWN_INSTAGRAM_HANDLE,
      bio,
      interests,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "setup" ? "Set up the page" : "Edit profile"}
          </DialogTitle>
          <DialogDescription>
            Tweak the name, bio, or Instagram handle. Defaults stay locked to
            Zack's Way Media.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="kid-name" className="text-xs uppercase tracking-[0.14em] text-muted">
              Display name
            </Label>
            <Input
              id="kid-name"
              placeholder="Zack's Way Media"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="nickname"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ig-handle" className="text-xs uppercase tracking-[0.14em] text-muted">
              Instagram handle
            </Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-subtle">
                @
              </span>
              <Input
                id="ig-handle"
                className="pl-7"
                placeholder={KNOWN_INSTAGRAM_HANDLE}
                value={handle}
                onChange={(e) => setHandle(e.target.value.replace(/^@/, ""))}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <p className="text-xs text-subtle">From the QR: @{KNOWN_INSTAGRAM_HANDLE}</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="kid-bio" className="text-xs uppercase tracking-[0.14em] text-muted">
              Short bio
            </Label>
            <Textarea
              id="kid-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={220}
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-xs uppercase tracking-[0.14em] text-muted">Interests</Label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((opt) => {
                const on = interests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleInterest(opt.id)}
                    className={cn(
                      "border px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition-colors",
                      on
                        ? "border-primary bg-primary-soft text-primary"
                        : "border-border bg-surface-2 text-muted hover:border-border-strong",
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 border border-border bg-surface-2 px-3 py-2.5">
            <MapPin className="size-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-fg">Lynchburg, Virginia</p>
              <p className="text-xs text-muted">Home base is locked in</p>
            </div>
            <Badge variant="accent" className="ml-auto shrink-0">
              VA
            </Badge>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={save} className="w-full sm:w-auto">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
