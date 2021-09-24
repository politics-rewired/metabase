import { t } from "ttag";

import { isTemporal } from "metabase/lib/schema_metadata";

import PivotByDrill from "./PivotByDrill";

export default PivotByDrill(t`Time`, "clock", field => isTemporal(field));
