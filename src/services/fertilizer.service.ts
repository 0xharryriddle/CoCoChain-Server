import Fertilizer from "@models/fertilizer";
import apiReturn from "@utils/apiReturn.util";

export async function addFertilizer({
  fertilizerName,
  maxAllowedValue,
}: {
  fertilizerName: string;
  maxAllowedValue: number;
}) {
  try {
    const fertilizer = await Fertilizer.create({
      fertilizerName,
      maxAllowedValue,
    });

    const checkCreation = await Fertilizer.findByPk(fertilizer.id);

    if (checkCreation == null) {
      throw Error("Failed creation");
    }

    return apiReturn.success(200, "Added new fertilizer successfully");
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Added new fertilizer failed");
  }
}

export async function modifyFertilizer({
  id,
  fertilizerName,
  maxAllowedName,
  active,
}: {
  id: number;
  fertilizerName?: string;
  maxAllowedName?: number;
  active?: boolean;
}) {
  try {
    const checkIsExisted = await Fertilizer.findByPk(id);
    if (checkIsExisted == null) {
      throw Error("Fertilizer is not existed yet");
    }

    if (fertilizerName == null && !maxAllowedName == null && active == null) {
      throw Error("Wrong Information to modify");
    }

    let data = {};
    if (fertilizerName) {
      data = {
        ...data,
        fertilizerName: fertilizerName,
      };
    }
    if (maxAllowedName) {
      data = {
        ...data,
        maxAllowedName: maxAllowedName,
      };
    }
    if (active) {
      data = {
        ...data,
        active: active,
      };
    }

    await Fertilizer.update(data, {
      where: {
        id: id,
      },
    });

    return apiReturn.success(200, "Modified fertilizer successfully");
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Modified fertilizer failed");
  }
}

export async function getFertilizer({ id }: { id: number }) {
  try {
    const fertilizer = await Fertilizer.findByPk(id);

    if (fertilizer == null) {
      throw Error("Fertilizer not found");
    }

    return apiReturn.success(200, "Get fertilizer successfully", fertilizer);
  } catch (error) {
    console.log(error);
    return apiReturn.error(400, "Get fertilizer failed");
  }
}
