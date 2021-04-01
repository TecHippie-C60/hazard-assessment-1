export const LookupList = {
  "form": {
    "name": "",
    "controls": [
      {
        "type": "List",
        "label": "ID"
      }
    ],
    "details": [
      {
        "type": "List",
        "placeholder": "ID",
        "formControlName": "value",
        "label": "ID",
        "appearance": "outline",
        "required": false,
        "types": "text",
        "error": "Required Field"
      }
    ],
    "is_list": true,
    "labels": "[\"Value\"]",
    "columns": "id int4 NOT NULL DEFAULT nextval(`id_seq`::regclass), user_updated varchar , user_created varchar , user_archived integer , date_updated timestamp , date_archived timestamp , date_created timestamp, value varchar, PRIMARY KEY(id)"
  }
}