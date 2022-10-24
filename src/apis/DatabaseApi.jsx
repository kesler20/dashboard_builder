import RESTfulApiInterface from "./RESTfulApi";

/**
 * This api is used to connect the front end to the local storage and the backend
 *
 * @param resourceKey - The unique identifier key of the resource, this needs to be a string
 */
export default class DatabaseApi {
  constructor(resourcesDomain) {
    this.resourcesDomain = resourcesDomain;
    this.api = new RESTfulApiInterface();
  }

  /**
   * The create resource method will create a resource in local storage and in the database
   *
   * @param {*} resource - The resource that will be stored, preferably an object or array of objects
   */
  createResource(resourceKey, resource) {
    /**
     * check if the resource already exists in the database
     * put resource as a JSON object to ./baseURL/resourcesDomain/CREATE if does not exist
     */
    localStorage.setItem(resourceKey, JSON.stringify(resource));
    this.api.putResource(this.resourcesDomain, resource);
  }
  //TODO: should you check that is an array? because you assumed that it is an array in other parts of the program
  createResourceInLocalStorage(resourceKey, resource) {
    localStorage.setItem(resourceKey, JSON.stringify(resource));
  }

  /**
   * Update resources in local storage,this function can be run iteratively as
   * the resource value will be overridden each times the function is called
   *
   * @param {*} resourceKey - The unique identifier key of the resource, this needs to be a string
   * @param {*} resource - The resource that will be stored, preferably an object or array of objects
   *
   * __NOTE ensure that the existing resource and therefore the initial resource stored under the
   *  selected resourceKey is an array or other collections which can be unpacked ``...resource``__
   */
  saveResourceToLocalStorage(resourceKey, resource) {
    /**
     * update an existing resource in local storage
     * or create the resource if the resourceKey returns null
     */
    let existingResources = this.readResourceFromLocalStorage(resourceKey);
    let updatedResources = [...existingResources, resource];
    localStorage.setItem(resourceKey, JSON.stringify(updatedResources));
  }
  /**
   * Get resources as parsed objects from local storage with the corresponding resourceKey
   * otherwise return asn empty array
   *
   * @param {*} resourceKey - The unique identifier key of the resource, this needs to be a string
   *
   * __NOTE ensure that the resource key is a string
   */
  readResourceFromLocalStorage(resourceKey) {
    /**
     * check if undefined is saved to local storage
     * return [] if the local storage item is not created which means that the localStorage.getItem returns null
     * otherwise return parsed object
     */
    let retrievedResource = localStorage.getItem(resourceKey);
    if (retrievedResource === "undefined") return [];
    return localStorage.getItem(resourceKey) === null
      ? []
      : JSON.parse(localStorage.getItem(resourceKey));
  }

  /**
   * This function will replace an existing resource with the provided key value pair in local storage
   * in the event that there are no resources with the given resourceKey, the resource will be saved to local storage
   *
   * @param {*} resourceKey - The unique identifier key of the resource, this needs to be a string
   * @param {*} targetKey - The key of the target resource that you want to replace
   * @param {*} targetValue - The value of the resource that you want to replace
   * @param {*} resource - The new resource to insert to the local storage
   */
  updateResourceInLocalStorage(resourceKey, targetKey, targetValue, resource) {
    let existingResources = this.readResourceFromLocalStorage(resourceKey);

    /**
     * if there are no existing resources then the resource will be created
     * in local storage
     */
    if (existingResources.length !== 0) {
      let newResources = existingResources.map((element) => {
        if (element[`${targetKey}`] === targetValue) {
          return resource;
        }
        return element;
      });
      this.createResourceInLocalStorage(resourceKey, newResources);
    } else {
      this.createResourceInLocalStorage(resourceKey, resource);
    }
  }

  /**
   * This method will read the resource from local storage, if the resource key will not be found
   * this method can be implemented by awaiting its return i.e.
   * ```javascript
   * async () => {
   *    await db.readResource("userFiles")
   * }
   * ```
   * it will send a GET request to the server to the ``baseUrl/resourceEndpoint/READ`` endpoint
   * if also this fail it will return an empty array []
   *
   * @param {*} resourceKey - The unique identifier key of the resource, this needs to be a string
   * @returns The requested resource as a an object or an empty array
   */
  async readResource(resourceKey) {
    /**
     * if the local storage get request returns null i.e. the item is not in local storage
     * call the GET method on the backend
     * if the resource remains undefined after the request return an empty list
     */
    let resource = this.readResourceFromLocalStorage(resourceKey);
    if (resource.length === 0) {
      await this.api.getResource(this.resourcesDomain).then((res) => {
        resource = res.resource["files found"];
      });
    }
    return resource;
  }

  /**
   * Delete a resource both in local storage and in the backend
   * __NOTE: due to the implementation of the delete function in the backend all the resources
   * which will share the same resourceKey will be removed from the database__
   * @param {*} resourceKey - The unique identifier key of the resource, this needs to be a string
   * @returns
   */
  deleteResource(resourceKey, targetKey, targetValue) {
    /**
     * if the local storage get request returns null i.e. the item is not in local storage
     * call the GET method on the backend
     * if the resource remains undefined after the request return an empty list
     */
    let resources = this.readResourceFromLocalStorage(resourceKey);
    resources = resources.filter(
      (resource) => resource[`${targetKey}`] !== targetValue
    );
    localStorage.setItem(resourceKey, JSON.stringify(resources));
    console.log("resource updated in local storage", resources);
    this.api.deleteResource(this.resourcesDomain, targetValue);
  }
}
