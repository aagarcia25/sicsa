export const plantillaHTML = 
`
          <table border="1" class="dataframe" style="border-collapse: collapse; width: 100%;">
    <thead style="background-color: #e0e0e0; font-weight: bold; color: #333;">
    <tr>
    <!-- Encabezado para AUDITORÍA -->
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="11"></th>
    <!-- Encabezado para ALCANCE DE REVISIÓN -->
    <!-- Encabezado vacío hasta llegar a RESULTADOS -->
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="color: #000; padding: 8px; text-align: center border: none; background-color: white;" colspan="1">MDP</th>
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="color: #000; padding: 8px; text-align: center; background-color: white;" colspan="1">MDP</th>
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="padding: 8px; text-align: center; border: none; background-color: white;" colspan="1"></th>
    <th style="color: #000; padding: 8px; text-align: center; background-color: white;" colspan="1">MDP</th>
</tr>
        <tr>
            <!-- Encabezado para AUDITORÍA -->
            <th style="padding: 8px; text-align: center; background-color: white;" colspan="11"></th>
            <!-- Encabezado para ALCANCE DE REVISIÓN -->
            <!-- Encabezado vacío hasta llegar a RESULTADOS -->
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;" colspan="1">TOTAL</th>
            <th style="background-color: #FFFFFF; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
            <th style="background-color: #FFFFFF; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
            <th style="background-color: #FFFFFF; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
            <th style="background-color: #FFFFFF; color: #000; padding: 8px; text-align: center;" colspan="1">-</th>
            <th style="background-color: #FFFFFF; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
            <th style="background-color: #FFFFFF; color: #000; padding: 8px; text-align: center;" colspan="1">-</th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;" colspan="1"></th>
        </tr>
        <tr>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;" colspan="8">AUDITORÍA</th>
            <th style="background-color: #FDCB00; color: #000; padding: 8px; text-align: center;" colspan="3">ALCANCE DE REVISIÓN ASF</th>

            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;" colspan="13">RESULTADOS</th>
        </tr>
        <tr>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;">Núm. Cons.</th>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;">Cuenta Pública</th>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;">Número Auditoría</th>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;">Entidades Fiscalizadas</th>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;">Título de Auditoría</th>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;">Tipo Auditoría</th>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;">Modalidad</th>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;">UAA</th>
            <th style="background-color: #FDCB00; color: #000; padding: 8px; text-align: center;">Monto del programa</th>
            <th style="background-color: #FDCB00; color: #000; padding: 8px; text-align: center;">Muestra Auditada</th>
            <th style="background-color: #FDCB00; color: #000; padding: 8px; text-align: center;">% Muestra</th>
            <!-- Aquí comienza RESULTADOS -->
            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;">Con Acciones</th>
            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;">R</th>
            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;">RD</th>
            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;">PRFCF</th>
            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;">SA</th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;">Monto SA</th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;">Ente Resp.</th>
            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;">PRAS</th>
            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;">PO</th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;">Monto PO</th>
            <th style="background-color: #F8D1BB; color: #000; padding: 8px; text-align: center;">Ente Resp.</th>
            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;">Total Acciones</th>
            <th style="background-color: #BF0707; color: #FFF; padding: 8px; text-align: center;">Total Monto Osb.</th>
            <th style="background-color: #000545; color: #FFF; padding: 8px; text-align: center;">Dictamen</th>
        </tr>
    </thead>
    <tbody>
        {{RowsAuditorias}}
    </tbody>
</table>

        `
        
        export const buildAuditoriaTabla = ()=>{

        }