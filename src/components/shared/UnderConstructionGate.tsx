import { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

interface UnderConstructionGateProps {
  children: React.ReactNode;
}

const ACCESS_CODE_KEY = "dev_gate_unlocked";
const TARGET_CODE = "2007";

function Gate() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (value === TARGET_CODE) {
      sessionStorage.setItem(ACCESS_CODE_KEY, "true");
      // Force reload to let the initial state check pick it up and remount
      window.location.reload();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setValue("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8 mesh-bg-public">
      <div className="mb-8 flex justify-center">
        <img
          src="/undraw_under-construction_hdrn.svg"
          alt="Under Construction"
          className="w-48 sm:w-64 max-w-full"
        />
      </div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-3">
        Under Construction
      </h1>
      <p className="text-muted-foreground mb-8">
        This platform is currently under active development. Please enter the
        access code to proceed.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center">
          <InputOTP
            maxLength={4}
            value={value}
            onChange={(val) => {
              setValue(val);
              setError(false);
              if (val.length === 4) {
                // Small delay to allow user to see the 4th digit typed
                setTimeout(() => {
                  if (val === TARGET_CODE) {
                    sessionStorage.setItem(ACCESS_CODE_KEY, "true");
                    window.location.reload();
                  } else {
                    setError(true);
                    setValue("");
                  }
                }, 150);
              }
            }}
            onSubmit={handleSubmit}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className={error ? "border-destructive text-destructive" : ""} />
              <InputOTPSlot index={1} className={error ? "border-destructive text-destructive" : ""} />
              <InputOTPSlot index={2} className={error ? "border-destructive text-destructive" : ""} />
              <InputOTPSlot index={3} className={error ? "border-destructive text-destructive" : ""} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="mt-2 text-sm text-destructive font-medium animate-slide-in">
              Incorrect access code
            </p>
          )}
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={value.length < 4}
        >
          Access Platform
        </Button>
      </form>
    </div>
  );
}

export function UnderConstructionGate({ children }: UnderConstructionGateProps) {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);

  useEffect(() => {
    // Only access sessionStorage on the client
    const unlocked = sessionStorage.getItem(ACCESS_CODE_KEY) === "true";
    setIsUnlocked(unlocked);
  }, []);

  // Prevent flash of content during hydration/check
  if (isUnlocked === null) {
    return null;
  }

  if (!isUnlocked) {
    return <Gate />;
  }

  return <>{children}</>;
}
