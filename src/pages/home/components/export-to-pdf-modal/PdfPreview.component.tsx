import { GetComponentCode, UserDetails } from "../../../../../generated-client";
import { cn } from "../../../../utils/cn.util";
import { ComponentRender } from "../../../web-portfolio/components/component-render/ComponentRender.component";
import { useGetProfileComponentCode } from "../../../web-portfolio/hooks/useGetProfileComponentCode.hook";
import { ProfileFormComponentItemType } from "../profile-form/components/profile-form-component/profile-form-component.types";

export const PdfPreview = ({
  userData,
  selectedItemsIds,
  pdfRef,
}: {
  userData: UserDetails;
  selectedItemsIds: Record<string, string[]>;
  pdfRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { data: componentCodeData } = useGetProfileComponentCode();

  const filteredData = [];

  filteredData.push({
    info: userData.info,
  });

  Object.entries(userData).map((userDataComponent) => {
    for (let i = 0; i < Object.entries(selectedItemsIds).length; i++) {
      if (userDataComponent[0] == Object.keys(selectedItemsIds)[i]) {
        filteredData.push({
          [userDataComponent[0]]: userDataComponent[1].filter(
            (item: ProfileFormComponentItemType) =>
              Object.values(selectedItemsIds)[i].includes(item?.id ?? "")
          ),
        });
      }
    }
  });

  return (
    <div
      className={cn(
        "mx-auto outline-gray-200 w-[210mm] max-[210mm]:w-full outline rounded-md min-h-screen "
      )}
    >
      <div ref={pdfRef}>
        {filteredData.map((item) => {
          return (
            <ComponentRender
              componentData={Object.values(item ?? {})[0]}
              componentCode={
                componentCodeData?.[
                  Object.keys(item ?? {})[0] as keyof GetComponentCode
                ]
              }
            />
          );
        })}
      </div>
    </div>
  );
};
