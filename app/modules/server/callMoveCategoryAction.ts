type CallMoveCategoryAction = (
  currentCategoryId: string,
  targetCategoryId: string,
  actionPath: string
) => void;

export const callMoveCategoryAction: CallMoveCategoryAction = async (
  currentCategoryId,
  targetCategoryId,
  actionPath
) => {
  const formData = new FormData();
  formData.append('currentCategoryId', currentCategoryId);
  formData.append('targetCategoryId', targetCategoryId);

  const response = await fetch(actionPath, {
    method: 'POST',
    body: formData,
  });

  return response;
};
