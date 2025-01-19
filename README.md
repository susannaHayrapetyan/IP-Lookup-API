# IP Lookup API

The IP Lookup API is a RESTful service that allows users to:

1. **Retrieve information about an IP address** from an external API ([ipwhois.io](https://ipwhois.io/)).
2. **Cache results in a database** to avoid repeated external requests for the same IP address within a specified Time-To-Live (TTL).
3. **Retrieve cached IP data** if available and valid.
4. **Remove cached data** for specific IP addresses.
5. Automatically **invalidate cached results** after the TTL (default is 60 seconds).

---

## Prerequisites

- **Node.js** (>=14.x)
- **npm**

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/susannaHayrapetyan/IP-Lookup-API.git
   cd IP-Lookup-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start:dev
   ```

---

## API Endpoints

### 1. Get IP Information
**Endpoint:** `GET /api/ip/:ip`

**Description:** Retrieves information about a given IP address. If cached data is available and valid, it will be returned; otherwise, the IP information is fetched from the external API and cached.

**Example Request:**
```bash
GET /api/ip/8.8.8.8
```

### 2. Delete Cached IP Data
**Endpoint:** `DELETE /api/ip/:ip`

**Description:** Removes cached data for a specific IP address.

**Example Request:**
```bash
DELETE /api/ip/8.8.8.8
```

## Future Enhancements

1. **Rate Limiting**: Prevent abuse by limiting the number of requests per user/IP.
2. **Comprehensive Logging**: Integrate a logging library like `winston` or `pino`.
5. **Add tests**: Add unit and integration tests.

---

## Author

[Susanna Hayrapetyan](https://github.com/susannaHayrapetyan)
