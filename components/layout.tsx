interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
