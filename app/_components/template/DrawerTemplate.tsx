import ConstraintLayoutTemplate from "@/app/_components/template/ConstraintLayoutTemplate";

export default function DrawerTemplate({
  children,
  focus,
}: {
  children: React.ReactNode;
  focus: string;
}) {
  return (
    <div
      className={`drawer drawer-end ${focus === null ? "" : "md:drawer-open"}`}
    >
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <ConstraintLayoutTemplate>{children}</ConstraintLayoutTemplate>
        {/* Page content here */}
        {/*<label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>*/}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="drawer-content bg-base-200 text-base-content min-h-full">
          <h1 className="">{focus}</h1>

          <ul className="menu p-4 w-96">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
