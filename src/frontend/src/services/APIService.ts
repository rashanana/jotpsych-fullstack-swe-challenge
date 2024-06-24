class APIService {
  private static instance: APIService;
  private baseUrl: string;
  public appVersion: string;
  private setAppVersion?: (version: string) => void; 

  private constructor() {
    this.baseUrl = "http://localhost:3002";
    this.appVersion = "1.2.0";
  }

  public static getInstance(setAppVersion?: (version: string) => void): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    if (setAppVersion) {
      APIService.instance.setAppVersion = setAppVersion;
    }
    return APIService.instance;
  }

  public async request(
    endpoint: string,
    method: string,
    body?: Record<string, any> | FormData | null, // Allow FormData or JSON object -_- cmon man!
    auth: boolean = false
  ): Promise<any> {
    const headers: HeadersInit = {
      "app-version": this.appVersion,
    };

    if (auth) {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    let requestOptions: RequestInit = {
      method,
      headers,
    };

    // Check if body is FormData for multipart/form-data
    if (body instanceof FormData) {
      requestOptions.body = body;
    } else if (body) { // Assume body is JSON object if not FormData
      headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, requestOptions);

      if (!response.ok) {
        if (response.status === 426) {
          const data = await response.json();
          if (this.setAppVersion) {
            this.setAppVersion("1.2.0");
          }
          throw new Error(data.message);
        } else {
          const errorText = await response.text();
          console.error("Network response was not ok:", errorText);
          throw new Error(errorText);
        }
      }

      return response.json();
    } catch (error) {
      console.error("Error in request:", error);
      throw error;
    }
  }
}

export default APIService.getInstance();
