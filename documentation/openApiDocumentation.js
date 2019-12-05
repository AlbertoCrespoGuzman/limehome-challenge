
module.exports =   {
    openapi: '3.0.1',
    info: {
      version: '1.3.0',
      title: 'Get Hotels',
      description: 'Hotels API for Limehome Challenge',
      termsOfService: '',
      contact: {
        name: 'Alberto Crespo',
        email: 'alberto.crespo86@gmail.com',
        url: 'https://github.com/AlbertoCrespoGuzman'
      },
      license: {
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
      }
    },
     servers: [
        {
          url: 'http://localhost:8080/api/v1',
          description: 'Local server'
        },
        {
          url: 'https://api_url_testing',
          description: 'Testing server'
        }
      ],
      tags: [
        {
          name: 'Hotels API'
        }
      ],
      paths: {
        '/hotels': {
            get: {
                tags: ['Hotels API'],
                description: 'Get hotels by coordinates',
                operationId: 'getHotels',
                parameters: [
                    {
                    name: 'latlong',
                    in: 'query',
                    schema: {
                      type: 'string'
                    },
                    description: 'Latitude and longitude =  {latitude}, {longitude}',
                    required: true
                  }
                ],
                responses: {
                    '200': {
                      description: 'Hotels were obtained',
                      content: {
                        'application/json': {
                          schema: {
                            $ref: '#/components/schemas/Hotels'
                          }
                        }
                      }
                    },
                    '422': {
                      description: 'Not a valid latitude longitude value',
                      content: {
                        'application/json': {
                          schema: {
                            $ref: '#/components/schemas/Error'
                          },
                          example: {
                            msg: 'This is not a valid latitude longitude value'
                        }
                      }
                    }
                  }
                }
              }
            }
        },
        components: {
            schemas: {
                Category: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        title: {
                            type: 'string'
                        },
                        href: {
                            type: 'string',
                            description: 'url of the category'
                        },
                        type: {
                            type: 'string'
                        },
                        system: {
                            type: 'string'
                        }
                    }
                },
                Hotel: {
                    type: 'object',
                        properties: {
                            position: {
                                type: 'object',
                                required: [
                                    'lat',
                                    'long'
                                  ],
                                properties: {
                                    lat: {
                                        'type': 'number'
                                    },
                                    long: {
                                        'type': 'number'
                                    }
                                  }
                            },
                            distance: {
                                type: 'number'
                            },
                            title: {
                                type: 'string'
                            },
                            averageRating: {
                                type: 'number'
                            },
                            category: {
                                $ref: '#/components/schemas/Category'
                            },
                            icon: {
                                type: 'string',
                                description: 'Icon URL',
                                example: 'https://download.vcdn.cit.data.here.com/p/d/places2_stg/icons/categories/01.icon'
                            },
                            vicinity:{
                                type: 'string',
                                description: 'Address'
                            },
                            having:{
                                type: 'array'
                            },
                            type: {
                                type: 'string',
                                description: 'type of point'
                            },
                            id: {
                                type: 'string'
                            }

                        }
                },
                Hotels: {
                    type: 'object',
                    properties: {
                      users: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Hotel'
                        }
                      }
                    }
                  },
                Error:{
                    type: 'object',
                    properties: {
                        msg:{
                            type: 'string'
                          },
                        param:{
                            type: 'string'
                          },
                        location:{
                            type: 'string',
                            description: 'type of parameter'
                          }
                    }
                }
            }
        }


  };