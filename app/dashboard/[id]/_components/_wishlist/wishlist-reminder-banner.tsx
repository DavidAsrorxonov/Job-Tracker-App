"use client";

const WishlistReminder = () => {
  return (
    <div className="my-6 flex items-center gap-4 border-y border-primary-foreground py-2">
      <div className="flex-1 border border-dashed border-primary-foreground" />

      <div className="flex flex-col items-center justify-center gap-2">
        <span className="px-3 text-2xl font-extrabold text-foreground bg-background">
          Need a quick recap?
        </span>
        <span className="text-sm text-muted-foreground">
          Check out your wishlist
        </span>
      </div>

      <div className="flex-1 border border-dashed border-primary-foreground" />
    </div>
  );
};

export default WishlistReminder;
