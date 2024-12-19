import { EventType } from "./enum.util";

export const eventTemplate = ({
  eventType,
  image,
  metadata,
}: {
  eventType: EventType;
  image: string;
  metadata: any;
}) => {
  return {
    image,
    eventType,
    metadata,
  };
};

export const productTemplate = ({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image: string;
}) => {
  return {
    name,
    description,
    image,
  };
};

export const agriculturalProductTemplate = ({
  name,
  farmerName,
  image,
}: {
  name: string;
  farmerName: string;
  image: string;
}) => {
  return {
    name,
    farmerName,
    image,
  };
};

export const farmerTemplate = ({
  name,
  image,
  address,
  commitment,
}: {
  name: string;
  image: string;
  address: string;
  commitment: string;
}) => {
  return {
    name,
    image,
    address,
    commitment,
  };
};
