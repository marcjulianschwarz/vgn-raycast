import { ActionPanel, Detail, List, Action } from "@raycast/api";
import { useEffect, useState } from "react";
import fetch from "node-fetch";

interface VGNMetadata {
  Version: string;
  Timestamp: string;
}

interface Haltestelle {
  Haltestellenname: string;
  VAGKennung: string;
  VGNKennung: number;
  Longitude: number;
  Latitude: number;
  Produkte: string;
}

interface VGNResponse {
  Metadata: VGNMetadata;
  Haltestellen: Haltestelle[];
}

export default function Command() {
  const [res, setRes] = useState<VGNResponse>({} as VGNResponse);
  const url = "https://start.vag.de/dm/api/v1/haltestellen/VGA";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setRes(json as VGNResponse));
  });

  return (
    <List>
      {res.Haltestellen?.map((haltestelle) => (
        <List.Item
          key={haltestelle.VAGKennung}
          title={haltestelle.Haltestellenname}
          subtitle={haltestelle.VAGKennung}
        />
      ))}
    </List>
  );
}
