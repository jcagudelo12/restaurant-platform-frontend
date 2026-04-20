type OfflineBannerProps = {
  isOffline: boolean;
};

export function OfflineBanner({ isOffline }: OfflineBannerProps) {
  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[110] bg-warning-500 text-text-primary text-center py-2 px-4 font-medium text-sm">
      ⚡ Sin conexión — Los datos se sincronizarán cuando vuelva el internet
    </div>
  );
}