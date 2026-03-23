import { RuntimeVal } from "./values.ts";

export default class Environment {
  private parent?: Environment;
  private variables: Map<string, RuntimeVal>;
  private constants: Set<string>;
  readonly name: string;
  
  constructor(parentENV?: Environment) {
    this.parent = parentENV;
    this.variables = new Map();
    this.constants = new Set();
    
  }

  public declareVar(varname: string, value: RuntimeVal,constant: boolean): RuntimeVal {
    console.log(varname,value);
    if (this.variables.has(varname)) {
      throw `Cannot declare variable ${varname}. As it already exists.`;
    }
    
    this.variables.set(varname, value);

    if(constant){
      this.constants.add(varname);
    }

    return value;


  }

  lookupVar(varname: string): RuntimeVal {
    const env = this.resolve(varname);
    return env.variables.get(varname)!;
  }

  assignVar(varname: string, value: RuntimeVal): RuntimeVal {
    const env = this.resolve(varname);
    if(env.constants.has(varname)) {
      throw `Cannot reassign to constant ${varname} as it was declared constant.`;
    }

    env.variables.set(varname, value);
    return value;
  }

  private resolve(varname: string): Environment {
    if (this.variables.has(varname)) {
      return this;
    }

    if (this.parent) {
      return this.parent.resolve(varname);
    }

    throw `Cannot resolve '${varname}' as it does not exist.`;
  }
}