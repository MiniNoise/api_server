# Endpoint api/v1/user Documentation

Content-Type: `application/json`

## List of Endpoints

### Regiser

* **URL**
`/user`

* **Mehtod**
`POST`

* **Data Params**
`email`: User Email
`password`: User Password

* **Success Response**
    * **Code**: 200
    * **Content**:
    ```json
    {
        "code": "00",
        "text": "Register Successful",
        "data": {
            "session": "JWT"
        }
    }
    ```

### Login

* **URL**
`/user/:email`

* **Mehtod**
`POST`

* **Data Params**
`:email`: User Email
`password`: User Password

* **Success Response**
    * **Code**: 200
    * **Content**:
    ```json
    {
        "code": "00",
        "text": "Login Successful",
        "data": {
            "session": "JWT"
        }
    }
    ```

### Delete Account

* **URL**
`/user/:email`

* **Mehtod**
`DELETE`

* **Header**
`Authorisation`: Session Token

* **Data Params**
`:email`: User Email

* **Success Response**
    * **Code**: 200
    * **Content**:
    ```json
    {
        "code": "00",
        "text": "Account Removed Successfully",
        "data": {
            "session": "JWT"
        }
    }
    ```
