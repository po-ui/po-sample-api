/**
 * Parser OData $filter completo conforme especificação OData v4.01
 * Seção 11.2.6.1 - Built-in Filter Operations e Built-in Query Functions
 *
 * Suporta:
 * - Operadores de comparação: eq, ne, gt, ge, lt, le, has, in
 * - Operadores lógicos: and, or, not
 * - Operadores aritméticos: add, sub, mul, div, divby, mod
 * - Agrupamento com parênteses
 * - Funções de string: concat, contains, endswith, indexof, length, startswith, substring,
 *   matchesPattern, tolower, toupper, trim
 * - Funções de data/hora: day, date, hour, maxdatetime, mindatetime, minute, month, now,
 *   second, year, fractionalseconds, totaloffsetminutes, totalseconds, time
 * - Funções aritméticas: ceiling, floor, round
 * - Funções de tipo: cast, isof
 * - Funções condicionais: case
 */

// ============================================================================
// Tokenizer
// ============================================================================

enum TokenType {
  // Literals
  STRING_LITERAL,
  NUMBER_LITERAL,
  BOOLEAN_LITERAL,
  NULL_LITERAL,
  DATE_LITERAL,
  DURATION_LITERAL,

  // Identifier
  IDENTIFIER,

  // Comparison operators
  EQ, NE, GT, GE, LT, LE, HAS, IN,

  // Logical operators
  AND, OR, NOT,

  // Arithmetic operators
  ADD, SUB, MUL, DIV, DIVBY, MOD,

  // Punctuation
  LPAREN, RPAREN, COMMA, SLASH, COLON,

  // EOF
  EOF,
}

interface Token {
  type: TokenType;
  value: string | number | boolean | null;
  position: number;
}

const KEYWORD_MAP: Record<string, TokenType> = {
  eq: TokenType.EQ,
  ne: TokenType.NE,
  gt: TokenType.GT,
  ge: TokenType.GE,
  lt: TokenType.LT,
  le: TokenType.LE,
  has: TokenType.HAS,
  in: TokenType.IN,
  and: TokenType.AND,
  or: TokenType.OR,
  not: TokenType.NOT,
  add: TokenType.ADD,
  sub: TokenType.SUB,
  mul: TokenType.MUL,
  div: TokenType.DIV,
  divby: TokenType.DIVBY,
  mod: TokenType.MOD,
  true: TokenType.BOOLEAN_LITERAL,
  false: TokenType.BOOLEAN_LITERAL,
  null: TokenType.NULL_LITERAL,
};

class ODataTokenizer {
  private pos = 0;
  private tokens: Token[] = [];

  constructor(private input: string) {}

  tokenize(): Token[] {
    this.tokens = [];
    this.pos = 0;

    while (this.pos < this.input.length) {
      this.skipWhitespace();
      if (this.pos >= this.input.length) break;

      const ch = this.input[this.pos];

      if (ch === '(') {
        this.tokens.push({ type: TokenType.LPAREN, value: '(', position: this.pos });
        this.pos++;
      } else if (ch === ')') {
        this.tokens.push({ type: TokenType.RPAREN, value: ')', position: this.pos });
        this.pos++;
      } else if (ch === ',') {
        this.tokens.push({ type: TokenType.COMMA, value: ',', position: this.pos });
        this.pos++;
      } else if (ch === '/') {
        this.tokens.push({ type: TokenType.SLASH, value: '/', position: this.pos });
        this.pos++;
      } else if (ch === ':') {
        this.tokens.push({ type: TokenType.COLON, value: ':', position: this.pos });
        this.pos++;
      } else if (ch === "'") {
        this.readString();
      } else if (ch === '-' && this.pos + 1 < this.input.length && this.isDigit(this.input[this.pos + 1])) {
        this.readNumber();
      } else if (this.isDigit(ch)) {
        this.readNumberOrDate();
      } else if (this.isIdentStart(ch)) {
        this.readIdentifierOrKeyword();
      } else {
        this.pos++;
      }
    }

    this.tokens.push({ type: TokenType.EOF, value: null, position: this.pos });
    return this.tokens;
  }

  private skipWhitespace(): void {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }

  private readString(): void {
    const start = this.pos;
    this.pos++; // skip opening quote
    let value = '';

    while (this.pos < this.input.length) {
      if (this.input[this.pos] === "'") {
        if (this.pos + 1 < this.input.length && this.input[this.pos + 1] === "'") {
          value += "'";
          this.pos += 2;
        } else {
          this.pos++; // skip closing quote
          break;
        }
      } else {
        value += this.input[this.pos];
        this.pos++;
      }
    }

    this.tokens.push({ type: TokenType.STRING_LITERAL, value, position: start });
  }

  private readNumber(): void {
    const start = this.pos;
    let numStr = '';

    if (this.input[this.pos] === '-') {
      numStr += '-';
      this.pos++;
    }

    while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
      numStr += this.input[this.pos];
      this.pos++;
    }

    if (this.pos < this.input.length && this.input[this.pos] === '.') {
      numStr += '.';
      this.pos++;
      while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
        numStr += this.input[this.pos];
        this.pos++;
      }
    }

    this.tokens.push({ type: TokenType.NUMBER_LITERAL, value: parseFloat(numStr), position: start });
  }

  private readNumberOrDate(): void {
    const start = this.pos;
    let str = '';

    // Read digits
    while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
      str += this.input[this.pos];
      this.pos++;
    }

    // Check for date pattern: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
    if (str.length === 4 && this.pos < this.input.length && this.input[this.pos] === '-') {
      const remaining = this.input.substring(this.pos);
      const dateTimeMatch = remaining.match(/^-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})?)?/);
      if (dateTimeMatch) {
        str += dateTimeMatch[0];
        this.pos += dateTimeMatch[0].length;
        this.tokens.push({ type: TokenType.DATE_LITERAL, value: str, position: start });
        return;
      }
    }

    // Check for decimal
    if (this.pos < this.input.length && this.input[this.pos] === '.') {
      str += '.';
      this.pos++;
      while (this.pos < this.input.length && this.isDigit(this.input[this.pos])) {
        str += this.input[this.pos];
        this.pos++;
      }
    }

    this.tokens.push({ type: TokenType.NUMBER_LITERAL, value: parseFloat(str), position: start });
  }

  private readIdentifierOrKeyword(): void {
    const start = this.pos;
    let ident = '';

    while (this.pos < this.input.length && this.isIdentPart(this.input[this.pos])) {
      ident += this.input[this.pos];
      this.pos++;
    }

    // Check for duration literal: duration'PT...'
    if (ident.toLowerCase() === 'duration' && this.pos < this.input.length && this.input[this.pos] === "'") {
      this.pos++; // skip quote
      let dur = '';
      while (this.pos < this.input.length && this.input[this.pos] !== "'") {
        dur += this.input[this.pos];
        this.pos++;
      }
      if (this.pos < this.input.length) this.pos++; // skip closing quote
      this.tokens.push({ type: TokenType.DURATION_LITERAL, value: dur, position: start });
      return;
    }

    const lower = ident.toLowerCase();

    // Check for keywords (case-insensitive per OData 4.01)
    if (lower in KEYWORD_MAP) {
      const tokenType = KEYWORD_MAP[lower];
      let tokenValue: string | number | boolean | null = lower;

      if (tokenType === TokenType.BOOLEAN_LITERAL) {
        tokenValue = lower === 'true';
      } else if (tokenType === TokenType.NULL_LITERAL) {
        tokenValue = null;
      }

      // Keywords must be followed by whitespace, '(', ')', ',', or EOF to be keywords
      // Otherwise they are identifiers (e.g., "indoor" should not be split as "in" + "door")
      if (this.isKeywordBoundary()) {
        this.tokens.push({ type: tokenType, value: tokenValue, position: start });
        return;
      }
    }

    this.tokens.push({ type: TokenType.IDENTIFIER, value: ident, position: start });
  }

  private isKeywordBoundary(): boolean {
    if (this.pos >= this.input.length) return true;
    const ch = this.input[this.pos];
    return /[\s(),/:]/.test(ch);
  }

  private isDigit(ch: string): boolean {
    return ch >= '0' && ch <= '9';
  }

  private isIdentStart(ch: string): boolean {
    return /[a-zA-Z_$]/.test(ch);
  }

  private isIdentPart(ch: string): boolean {
    return /[a-zA-Z0-9_$.]/.test(ch);
  }
}

// ============================================================================
// AST Nodes
// ============================================================================

interface LiteralNode {
  kind: 'literal';
  value: string | number | boolean | null | Date;
  literalType: 'string' | 'number' | 'boolean' | 'null' | 'date' | 'duration';
}

interface IdentifierNode {
  kind: 'identifier';
  name: string;
}

interface PropertyAccessNode {
  kind: 'propertyAccess';
  object: ASTNode;
  property: string;
}

interface BinaryOpNode {
  kind: 'binaryOp';
  operator: string;
  left: ASTNode;
  right: ASTNode;
}

interface UnaryOpNode {
  kind: 'unaryOp';
  operator: string;
  operand: ASTNode;
}

interface FunctionCallNode {
  kind: 'functionCall';
  name: string;
  args: ASTNode[];
}

interface InNode {
  kind: 'in';
  left: ASTNode;
  values: ASTNode[];
}

interface CaseNode {
  kind: 'case';
  branches: Array<{ condition: ASTNode; value: ASTNode }>;
}

type ASTNode =
  | LiteralNode
  | IdentifierNode
  | PropertyAccessNode
  | BinaryOpNode
  | UnaryOpNode
  | FunctionCallNode
  | InNode
  | CaseNode;

// ============================================================================
// Parser (Recursive Descent)
// ============================================================================

class ODataParser {
  private tokens: Token[] = [];
  private pos = 0;

  parse(input: string): ASTNode {
    const tokenizer = new ODataTokenizer(input);
    this.tokens = tokenizer.tokenize();
    this.pos = 0;
    const result = this.parseOr();
    return result;
  }

  private current(): Token {
    return this.tokens[this.pos] || { type: TokenType.EOF, value: null, position: -1 };
  }

  private peek(offset = 0): Token {
    return this.tokens[this.pos + offset] || { type: TokenType.EOF, value: null, position: -1 };
  }

  private advance(): Token {
    const token = this.current();
    this.pos++;
    return token;
  }

  private expect(type: TokenType): Token {
    const token = this.current();
    if (token.type !== type) {
      throw new Error(`OData parser: esperado ${TokenType[type]}, encontrado ${TokenType[token.type]} na posição ${token.position}`);
    }
    return this.advance();
  }

  private match(...types: TokenType[]): boolean {
    return types.includes(this.current().type);
  }

  // Precedência (menor → maior):
  // 1. or
  // 2. and
  // 3. not (unário)
  // 4. Comparação: eq, ne, gt, ge, lt, le, has, in
  // 5. Adição: add, sub
  // 6. Multiplicação: mul, div, divby, mod
  // 7. Unário: - (negação numérica)
  // 8. Primário: literais, identificadores, funções, parênteses

  private parseOr(): ASTNode {
    let left = this.parseAnd();

    while (this.match(TokenType.OR)) {
      this.advance();
      const right = this.parseAnd();
      left = { kind: 'binaryOp', operator: 'or', left, right };
    }

    return left;
  }

  private parseAnd(): ASTNode {
    let left = this.parseNot();

    while (this.match(TokenType.AND)) {
      this.advance();
      const right = this.parseNot();
      left = { kind: 'binaryOp', operator: 'and', left, right };
    }

    return left;
  }

  private parseNot(): ASTNode {
    if (this.match(TokenType.NOT)) {
      this.advance();
      const operand = this.parseNot();
      return { kind: 'unaryOp', operator: 'not', operand };
    }

    return this.parseComparison();
  }

  private parseComparison(): ASTNode {
    let left = this.parseAddSub();

    if (this.match(TokenType.EQ, TokenType.NE, TokenType.GT, TokenType.GE, TokenType.LT, TokenType.LE, TokenType.HAS)) {
      const op = this.advance();
      const right = this.parseAddSub();
      return { kind: 'binaryOp', operator: String(op.value), left, right };
    }

    if (this.match(TokenType.IN)) {
      this.advance();
      this.expect(TokenType.LPAREN);
      const values: ASTNode[] = [];
      if (!this.match(TokenType.RPAREN)) {
        values.push(this.parseOr());
        while (this.match(TokenType.COMMA)) {
          this.advance();
          values.push(this.parseOr());
        }
      }
      this.expect(TokenType.RPAREN);
      return { kind: 'in', left, values };
    }

    return left;
  }

  private parseAddSub(): ASTNode {
    let left = this.parseMulDiv();

    while (this.match(TokenType.ADD, TokenType.SUB)) {
      const op = this.advance();
      const right = this.parseMulDiv();
      left = { kind: 'binaryOp', operator: String(op.value), left, right };
    }

    return left;
  }

  private parseMulDiv(): ASTNode {
    let left = this.parseUnary();

    while (this.match(TokenType.MUL, TokenType.DIV, TokenType.DIVBY, TokenType.MOD)) {
      const op = this.advance();
      const right = this.parseUnary();
      left = { kind: 'binaryOp', operator: String(op.value), left, right };
    }

    return left;
  }

  private parseUnary(): ASTNode {
    if (this.match(TokenType.SUB)) {
      this.advance();
      const operand = this.parseUnary();
      return { kind: 'unaryOp', operator: '-', operand };
    }

    return this.parsePrimary();
  }

  private parsePrimary(): ASTNode {
    const token = this.current();

    // Parênteses
    if (token.type === TokenType.LPAREN) {
      this.advance();
      const expr = this.parseOr();
      this.expect(TokenType.RPAREN);
      return expr;
    }

    // String literal
    if (token.type === TokenType.STRING_LITERAL) {
      this.advance();
      return { kind: 'literal', value: String(token.value), literalType: 'string' };
    }

    // Number literal
    if (token.type === TokenType.NUMBER_LITERAL) {
      this.advance();
      return { kind: 'literal', value: Number(token.value), literalType: 'number' };
    }

    // Boolean literal
    if (token.type === TokenType.BOOLEAN_LITERAL) {
      this.advance();
      return { kind: 'literal', value: Boolean(token.value), literalType: 'boolean' };
    }

    // Null literal
    if (token.type === TokenType.NULL_LITERAL) {
      this.advance();
      return { kind: 'literal', value: null, literalType: 'null' };
    }

    // Date literal
    if (token.type === TokenType.DATE_LITERAL) {
      this.advance();
      return { kind: 'literal', value: String(token.value), literalType: 'date' };
    }

    // Duration literal
    if (token.type === TokenType.DURATION_LITERAL) {
      this.advance();
      return { kind: 'literal', value: String(token.value), literalType: 'duration' };
    }

    // Identifier (pode ser função, propriedade, ou case)
    if (token.type === TokenType.IDENTIFIER) {
      const name = String(token.value);
      this.advance();

      // case() function
      if (name.toLowerCase() === 'case' && this.match(TokenType.LPAREN)) {
        return this.parseCaseExpression();
      }

      // Function call
      if (this.match(TokenType.LPAREN)) {
        return this.parseFunctionCall(name);
      }

      // Property path com "/"
      let node: ASTNode = { kind: 'identifier', name };
      while (this.match(TokenType.SLASH)) {
        this.advance();
        const prop = this.expect(TokenType.IDENTIFIER);
        node = { kind: 'propertyAccess', object: node, property: String(prop.value) };
      }

      return node;
    }

    throw new Error(`OData parser: token inesperado ${TokenType[token.type]} (${token.value}) na posição ${token.position}`);
  }

  private parseFunctionCall(name: string): ASTNode {
    this.expect(TokenType.LPAREN);
    const args: ASTNode[] = [];

    if (!this.match(TokenType.RPAREN)) {
      args.push(this.parseOr());
      while (this.match(TokenType.COMMA)) {
        this.advance();
        args.push(this.parseOr());
      }
    }

    this.expect(TokenType.RPAREN);
    return { kind: 'functionCall', name: name.toLowerCase(), args };
  }

  private parseCaseExpression(): ASTNode {
    this.expect(TokenType.LPAREN);
    const branches: Array<{ condition: ASTNode; value: ASTNode }> = [];

    while (!this.match(TokenType.RPAREN)) {
      if (branches.length > 0) {
        this.expect(TokenType.COMMA);
      }

      const condition = this.parseOr();
      this.expect(TokenType.COLON);
      const value = this.parseOr();

      branches.push({ condition, value });
    }

    this.expect(TokenType.RPAREN);
    return { kind: 'case', branches };
  }
}

// ============================================================================
// Evaluator
// ============================================================================

class ODataEvaluator {

  evaluate(node: ASTNode, item: Record<string, unknown>): unknown {
    switch (node.kind) {
      case 'literal':
        return this.evaluateLiteral(node);
      case 'identifier':
        return this.resolveIdentifier(node, item);
      case 'propertyAccess':
        return this.resolvePropertyAccess(node, item);
      case 'binaryOp':
        return this.evaluateBinaryOp(node, item);
      case 'unaryOp':
        return this.evaluateUnaryOp(node, item);
      case 'functionCall':
        return this.evaluateFunctionCall(node, item);
      case 'in':
        return this.evaluateIn(node, item);
      case 'case':
        return this.evaluateCase(node, item);
      default:
        return null;
    }
  }

  private evaluateLiteral(node: LiteralNode): unknown {
    if (node.literalType === 'date') {
      return new Date(String(node.value));
    }
    if (node.literalType === 'duration') {
      return this.parseDuration(String(node.value));
    }
    return node.value;
  }

  private resolveIdentifier(node: IdentifierNode, item: Record<string, unknown>): unknown {
    // Suporta property paths com dot notation (e.g., "Address.City")
    const parts = node.name.split('.');
    let value: unknown = item;
    for (const part of parts) {
      if (value === null || value === undefined) return null;
      value = (value as Record<string, unknown>)[part];
    }
    return value;
  }

  private resolvePropertyAccess(node: PropertyAccessNode, item: Record<string, unknown>): unknown {
    const obj = this.evaluate(node.object, item);
    if (obj === null || obj === undefined) return null;
    return (obj as Record<string, unknown>)[node.property];
  }

  // --------------------------------------------------------------------------
  // Binary operators
  // --------------------------------------------------------------------------

  private evaluateBinaryOp(node: BinaryOpNode, item: Record<string, unknown>): unknown {
    const op = node.operator;

    // Logical operators (short-circuit)
    if (op === 'and') {
      return this.toBoolean(this.evaluate(node.left, item)) && this.toBoolean(this.evaluate(node.right, item));
    }
    if (op === 'or') {
      return this.toBoolean(this.evaluate(node.left, item)) || this.toBoolean(this.evaluate(node.right, item));
    }

    const left = this.evaluate(node.left, item);
    const right = this.evaluate(node.right, item);

    // Comparison operators
    switch (op) {
      case 'eq': return this.compareValues(left, right) === 0;
      case 'ne': return this.compareValues(left, right) !== 0;
      case 'gt': return this.compareValues(left, right) > 0;
      case 'ge': return this.compareValues(left, right) >= 0;
      case 'lt': return this.compareValues(left, right) < 0;
      case 'le': return this.compareValues(left, right) <= 0;
      case 'has': return this.evaluateHas(left, right);

      // Arithmetic operators
      case 'add': return this.toNumber(left) + this.toNumber(right);
      case 'sub': return this.toNumber(left) - this.toNumber(right);
      case 'mul': return this.toNumber(left) * this.toNumber(right);
      case 'div': {
        const divisor = this.toNumber(right);
        return divisor !== 0 ? Math.trunc(this.toNumber(left) / divisor) : null;
      }
      case 'divby': {
        const divisor = this.toNumber(right);
        return divisor !== 0 ? this.toNumber(left) / divisor : null;
      }
      case 'mod': {
        const divisor = this.toNumber(right);
        return divisor !== 0 ? this.toNumber(left) % divisor : null;
      }

      default:
        return null;
    }
  }

  // --------------------------------------------------------------------------
  // Unary operators
  // --------------------------------------------------------------------------

  private evaluateUnaryOp(node: UnaryOpNode, item: Record<string, unknown>): unknown {
    const operand = this.evaluate(node.operand, item);

    switch (node.operator) {
      case 'not':
        return !this.toBoolean(operand);
      case '-':
        return -this.toNumber(operand);
      default:
        return null;
    }
  }

  // --------------------------------------------------------------------------
  // In operator
  // --------------------------------------------------------------------------

  private evaluateIn(node: InNode, item: Record<string, unknown>): boolean {
    const left = this.evaluate(node.left, item);
    return node.values.some(v => this.compareValues(left, this.evaluate(v, item)) === 0);
  }

  // --------------------------------------------------------------------------
  // Case expression
  // --------------------------------------------------------------------------

  private evaluateCase(node: CaseNode, item: Record<string, unknown>): unknown {
    for (const branch of node.branches) {
      if (this.toBoolean(this.evaluate(branch.condition, item))) {
        return this.evaluate(branch.value, item);
      }
    }
    return null;
  }

  // --------------------------------------------------------------------------
  // Function calls
  // --------------------------------------------------------------------------

  private evaluateFunctionCall(node: FunctionCallNode, item: Record<string, unknown>): unknown {
    const args = node.args;
    const name = node.name;

    switch (name) {
      // ---- String functions ----
      case 'contains':
        return this.fnContains(args, item);
      case 'endswith':
        return this.fnEndsWith(args, item);
      case 'startswith':
        return this.fnStartsWith(args, item);
      case 'length':
        return this.fnLength(args, item);
      case 'indexof':
        return this.fnIndexOf(args, item);
      case 'substring':
        return this.fnSubstring(args, item);
      case 'tolower':
        return this.fnToLower(args, item);
      case 'toupper':
        return this.fnToUpper(args, item);
      case 'trim':
        return this.fnTrim(args, item);
      case 'concat':
        return this.fnConcat(args, item);
      case 'matchespattern':
        return this.fnMatchesPattern(args, item);

      // ---- Date/Time functions ----
      case 'year':
        return this.fnYear(args, item);
      case 'month':
        return this.fnMonth(args, item);
      case 'day':
        return this.fnDay(args, item);
      case 'hour':
        return this.fnHour(args, item);
      case 'minute':
        return this.fnMinute(args, item);
      case 'second':
        return this.fnSecond(args, item);
      case 'fractionalseconds':
        return this.fnFractionalSeconds(args, item);
      case 'date':
        return this.fnDate(args, item);
      case 'time':
        return this.fnTime(args, item);
      case 'now':
        return new Date();
      case 'maxdatetime':
        return new Date(8640000000000000);
      case 'mindatetime':
        return new Date(-8640000000000000);
      case 'totaloffsetminutes':
        return this.fnTotalOffsetMinutes(args, item);
      case 'totalseconds':
        return this.fnTotalSeconds(args, item);

      // ---- Arithmetic functions ----
      case 'round':
        return Math.round(this.toNumber(this.evaluate(args[0], item)));
      case 'floor':
        return Math.floor(this.toNumber(this.evaluate(args[0], item)));
      case 'ceiling':
        return Math.ceil(this.toNumber(this.evaluate(args[0], item)));

      // ---- Type functions ----
      case 'cast':
        return this.fnCast(args, item);
      case 'isof':
        return this.fnIsOf(args, item);

      // ---- Collection functions ----
      case 'hassubset':
        return this.fnHasSubset(args, item);
      case 'hassubsequence':
        return this.fnHasSubsequence(args, item);

      default:
        return null;
    }
  }

  // ---- String function implementations ----

  private fnContains(args: ASTNode[], item: Record<string, unknown>): boolean {
    const str = this.toString(this.evaluate(args[0], item));
    const search = this.toString(this.evaluate(args[1], item));
    return str.toLowerCase().includes(search.toLowerCase());
  }

  private fnEndsWith(args: ASTNode[], item: Record<string, unknown>): boolean {
    const str = this.toString(this.evaluate(args[0], item));
    const search = this.toString(this.evaluate(args[1], item));
    return str.toLowerCase().endsWith(search.toLowerCase());
  }

  private fnStartsWith(args: ASTNode[], item: Record<string, unknown>): boolean {
    const str = this.toString(this.evaluate(args[0], item));
    const search = this.toString(this.evaluate(args[1], item));
    return str.toLowerCase().startsWith(search.toLowerCase());
  }

  private fnLength(args: ASTNode[], item: Record<string, unknown>): number {
    const val = this.evaluate(args[0], item);
    if (Array.isArray(val)) return val.length;
    return this.toString(val).length;
  }

  private fnIndexOf(args: ASTNode[], item: Record<string, unknown>): number {
    const str = this.toString(this.evaluate(args[0], item));
    const search = this.toString(this.evaluate(args[1], item));
    return str.toLowerCase().indexOf(search.toLowerCase());
  }

  private fnSubstring(args: ASTNode[], item: Record<string, unknown>): string {
    const str = this.toString(this.evaluate(args[0], item));
    const start = this.toNumber(this.evaluate(args[1], item));
    if (args.length > 2) {
      const length = this.toNumber(this.evaluate(args[2], item));
      return str.substring(start, start + length);
    }
    return str.substring(start);
  }

  private fnToLower(args: ASTNode[], item: Record<string, unknown>): string {
    return this.toString(this.evaluate(args[0], item)).toLowerCase();
  }

  private fnToUpper(args: ASTNode[], item: Record<string, unknown>): string {
    return this.toString(this.evaluate(args[0], item)).toUpperCase();
  }

  private fnTrim(args: ASTNode[], item: Record<string, unknown>): string {
    return this.toString(this.evaluate(args[0], item)).trim();
  }

  private fnConcat(args: ASTNode[], item: Record<string, unknown>): string {
    return args.map(arg => this.toString(this.evaluate(arg, item))).join('');
  }

  private fnMatchesPattern(args: ASTNode[], item: Record<string, unknown>): boolean {
    const str = this.toString(this.evaluate(args[0], item));
    const pattern = this.toString(this.evaluate(args[1], item));
    try {
      const regex = new RegExp(pattern, 'i');
      return regex.test(str);
    } catch {
      return false;
    }
  }

  // ---- Date/Time function implementations ----

  private fnYear(args: ASTNode[], item: Record<string, unknown>): number {
    return this.toDate(this.evaluate(args[0], item)).getFullYear();
  }

  private fnMonth(args: ASTNode[], item: Record<string, unknown>): number {
    return this.toDate(this.evaluate(args[0], item)).getMonth() + 1;
  }

  private fnDay(args: ASTNode[], item: Record<string, unknown>): number {
    return this.toDate(this.evaluate(args[0], item)).getDate();
  }

  private fnHour(args: ASTNode[], item: Record<string, unknown>): number {
    return this.toDate(this.evaluate(args[0], item)).getHours();
  }

  private fnMinute(args: ASTNode[], item: Record<string, unknown>): number {
    return this.toDate(this.evaluate(args[0], item)).getMinutes();
  }

  private fnSecond(args: ASTNode[], item: Record<string, unknown>): number {
    return this.toDate(this.evaluate(args[0], item)).getSeconds();
  }

  private fnFractionalSeconds(args: ASTNode[], item: Record<string, unknown>): number {
    return this.toDate(this.evaluate(args[0], item)).getMilliseconds() / 1000;
  }

  private fnDate(args: ASTNode[], item: Record<string, unknown>): Date {
    const d = this.toDate(this.evaluate(args[0], item));
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  private fnTime(args: ASTNode[], item: Record<string, unknown>): string {
    const d = this.toDate(this.evaluate(args[0], item));
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  private fnTotalOffsetMinutes(args: ASTNode[], item: Record<string, unknown>): number {
    const d = this.toDate(this.evaluate(args[0], item));
    return -d.getTimezoneOffset();
  }

  private fnTotalSeconds(args: ASTNode[], item: Record<string, unknown>): number {
    const val = this.evaluate(args[0], item);
    if (typeof val === 'number') return val;
    // Duration string like "PT1H30M45S"
    return this.parseDuration(this.toString(val));
  }

  // ---- Type function implementations ----

  private fnCast(args: ASTNode[], item: Record<string, unknown>): unknown {
    if (args.length === 1) {
      // cast(Edm.Type) — cast null
      return null;
    }
    const value = this.evaluate(args[0], item);
    const typeName = this.toString(this.evaluate(args[1], item)).toLowerCase();

    if (typeName.includes('string')) return this.toString(value);
    if (typeName.includes('int') || typeName.includes('decimal') || typeName.includes('double') || typeName.includes('single')) {
      return this.toNumber(value);
    }
    if (typeName.includes('boolean')) return this.toBoolean(value);
    if (typeName.includes('datetimeoffset') || typeName.includes('date')) return this.toDate(value);
    return value;
  }

  private fnIsOf(args: ASTNode[], item: Record<string, unknown>): boolean {
    let value: unknown;
    let typeName: string;

    if (args.length === 1) {
      // isof(type) — check item type
      typeName = this.toString(this.evaluate(args[0], item)).toLowerCase();
      value = item;
    } else {
      value = this.evaluate(args[0], item);
      typeName = this.toString(this.evaluate(args[1], item)).toLowerCase();
    }

    if (typeName.includes('string')) return typeof value === 'string';
    if (typeName.includes('int') || typeName.includes('decimal') || typeName.includes('double')) return typeof value === 'number';
    if (typeName.includes('boolean')) return typeof value === 'boolean';
    if (typeName.includes('date')) return value instanceof Date || !isNaN(new Date(String(value)).getTime());
    return true;
  }

  // ---- Collection function implementations ----

  private fnHasSubset(args: ASTNode[], item: Record<string, unknown>): boolean {
    const collection = this.toArray(this.evaluate(args[0], item));
    const subset = this.toArray(this.evaluate(args[1], item));
    return subset.every(s => collection.some(c => this.compareValues(c, s) === 0));
  }

  private fnHasSubsequence(args: ASTNode[], item: Record<string, unknown>): boolean {
    const collection = this.toArray(this.evaluate(args[0], item));
    const subsequence = this.toArray(this.evaluate(args[1], item));
    let colIdx = 0;
    for (const subItem of subsequence) {
      let found = false;
      while (colIdx < collection.length) {
        if (this.compareValues(collection[colIdx], subItem) === 0) {
          colIdx++;
          found = true;
          break;
        }
        colIdx++;
      }
      if (!found) return false;
    }
    return true;
  }

  // ---- Has operator (flags/enums) ----

  private evaluateHas(left: unknown, right: unknown): boolean {
    if (typeof left === 'number' && typeof right === 'number') {
      return (left & right) === right;
    }
    const leftStr = this.toString(left).toLowerCase();
    const rightStr = this.toString(right).toLowerCase();
    return leftStr.includes(rightStr);
  }

  // --------------------------------------------------------------------------
  // Type conversion helpers
  // --------------------------------------------------------------------------

  private compareValues(left: unknown, right: unknown): number {
    // Handle null
    if (left === null && right === null) return 0;
    if (left === null) return -1;
    if (right === null) return 1;

    // Handle dates
    const leftDate = this.tryParseDate(left);
    const rightDate = this.tryParseDate(right);
    if (leftDate && rightDate) {
      return leftDate.getTime() - rightDate.getTime();
    }

    // Handle numbers
    if (typeof left === 'number' && typeof right === 'number') {
      return left - right;
    }

    // Handle booleans
    if (typeof left === 'boolean' && typeof right === 'boolean') {
      return (left === right) ? 0 : (left ? 1 : -1);
    }

    // String comparison (case-insensitive)
    const leftStr = this.toString(left).toLowerCase();
    const rightStr = this.toString(right).toLowerCase();
    if (leftStr < rightStr) return -1;
    if (leftStr > rightStr) return 1;
    return 0;
  }

  private tryParseDate(value: unknown): Date | null {
    if (value instanceof Date) return value;
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    return null;
  }

  private toBoolean(value: unknown): boolean {
    if (typeof value === 'boolean') return value;
    if (value === null || value === undefined) return false;
    if (typeof value === 'number') return value !== 0;
    if (typeof value === 'string') return value.length > 0 && value.toLowerCase() !== 'false';
    return true;
  }

  private toNumber(value: unknown): number {
    if (typeof value === 'number') return value;
    if (value instanceof Date) return value.getTime();
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'string') {
      const n = parseFloat(value);
      return isNaN(n) ? 0 : n;
    }
    return 0;
  }

  private toString(value: unknown): string {
    if (value === null || value === undefined) return '';
    if (value instanceof Date) return value.toISOString();
    return String(value);
  }

  private toDate(value: unknown): Date {
    if (value instanceof Date) return value;
    if (typeof value === 'string') return new Date(value);
    if (typeof value === 'number') return new Date(value);
    return new Date();
  }

  private toArray(value: unknown): unknown[] {
    if (Array.isArray(value)) return value;
    return [];
  }

  /**
   * Converte duração ISO 8601 (ex: "PT1H30M45S") para segundos
   */
  private parseDuration(duration: string): number {
    const match = duration.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/i);
    if (!match) return 0;
    const days = parseInt(match[1] || '0', 10);
    const hours = parseInt(match[2] || '0', 10);
    const minutes = parseInt(match[3] || '0', 10);
    const seconds = parseFloat(match[4] || '0');
    return days * 86400 + hours * 3600 + minutes * 60 + seconds;
  }
}

// ============================================================================
// Export principal
// ============================================================================

const parser = new ODataParser();
const evaluator = new ODataEvaluator();

/**
 * Aplica um filtro OData sobre um array de itens.
 *
 * @param items - Array de itens a filtrar
 * @param filterExpression - Expressão OData $filter
 * @returns Array de itens que satisfazem o filtro
 *
 * @example
 * // Comparação simples
 * applyODataFilter(items, "status eq 'Ativo'")
 *
 * @example
 * // Operadores lógicos
 * applyODataFilter(items, "status eq 'Ativo' and city eq 'São Paulo'")
 * applyODataFilter(items, "contains(name,'Silva') or contains(city,'Silva')")
 *
 * @example
 * // Funções de data
 * applyODataFilter(items, "year(hireDate) eq 2024")
 * applyODataFilter(items, "hireDate ge now()")
 *
 * @example
 * // Operadores aritméticos
 * applyODataFilter(items, "salary mul 12 gt 100000")
 *
 * @example
 * // Operador in
 * applyODataFilter(items, "city in ('São Paulo','Rio de Janeiro')")
 *
 * @example
 * // Funções de string
 * applyODataFilter(items, "tolower(name) eq 'ana silva'")
 * applyODataFilter(items, "length(name) gt 10")
 */
export function applyODataFilter<T extends Record<string, unknown>>(items: T[], filterExpression: string): T[] {
  try {
    const ast = parser.parse(filterExpression);
    return items.filter(item => {
      const result = evaluator.evaluate(ast, item);
      return evaluator['toBoolean'](result);
    });
  } catch (error) {
    console.error(`Erro ao processar filtro OData: ${filterExpression}`, error);
    return items;
  }
}
